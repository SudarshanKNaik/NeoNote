import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import apiClient from '../utils/api';
import {
  Upload,
  Video,
  FileVideo,
  Headphones,
  Volume2,
  Network,
  Eye,
  FileText,
  ArrowLeft,
  CheckCircle,
  Sparkles,
  X,
  ChevronRight,
  File,
  Clock,
  Trash2,
  MoreVertical,
  Loader2,
  Play,
} from 'lucide-react';

const Browse = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [materialsPanelOpen, setMaterialsPanelOpen] = useState(true);
  const [toolsPanelOpen, setToolsPanelOpen] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState({});
  const [interactions, setInteractions] = useState({});

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);

    for (const file of files) {
      // Check file type and size
      const isPdf = file.type === 'application/pdf';
      const isPpt = file.type === 'application/vnd.ms-powerpoint' || 
                    file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation';

      if (!isPdf && !isPpt) {
        alert(`File "${file.name}" is not a PDF or PPT file. Please upload a valid file.`);
        continue;
      }

      // Check file size (50MB limit)
      if (file.size > 50 * 1024 * 1024) {
        alert(`File "${file.name}" is too large. Maximum size is 50MB.`);
        continue;
      }

      try {
        const endpoint = isPdf ? '/api/v1/ai/upload-pdf' : '/api/v1/ai/upload-ppt';
        console.log('Uploading file:', file.name, 'type:', file.type, 'size:', file.size);
        const response = await apiClient.uploadFile(endpoint, file);

        if (response.success) {
          const interaction = response.data;
          const newFile = {
            id: interaction._id,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadDate: new Date().toLocaleDateString(),
            uploadTime: new Date().toLocaleTimeString(),
            interactionId: interaction._id,
            status: interaction.status
          };

          setUploadedFiles(prev => [...prev, newFile]);
          setInteractions(prev => ({ ...prev, [interaction._id]: interaction }));

          if (files.length === 1) {
            setSelectedFile(newFile);
          }

          // Poll for completion if processing
          if (interaction.status === 'processing') {
            setProcessing(prev => ({ ...prev, [interaction._id]: true }));
            pollInteractionStatus(interaction._id);
          }
        }
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        alert(`Error uploading "${file.name}": ${error.message}`);
      }
    }

    setUploading(false);
  };

  const pollInteractionStatus = async (interactionId) => {
    const maxAttempts = 30;
    let attempts = 0;

    const poll = setInterval(async () => {
      attempts++;
      try {
        const response = await apiClient.get(`/api/v1/ai/interactions/${interactionId}/status`);
        if (response.success) {
          const interaction = response.data;
          setInteractions(prev => ({ ...prev, [interactionId]: interaction }));

          if (interaction.status === 'completed' || interaction.status === 'failed') {
            clearInterval(poll);
            setProcessing(prev => {
              const newState = { ...prev };
              delete newState[interactionId];
              return newState;
            });

            // Update file status
            setUploadedFiles(prev => prev.map(file => 
              file.interactionId === interactionId 
                ? { ...file, status: interaction.status }
                : file
            ));
          }
        }
      } catch (error) {
        console.error('Error polling status:', error);
      }

      if (attempts >= maxAttempts) {
        clearInterval(poll);
        setProcessing(prev => {
          const newState = { ...prev };
          delete newState[interactionId];
          return newState;
        });
      }
    }, 2000);
  };

  const handleDeleteFile = (fileId, e) => {
    e.stopPropagation();
    setUploadedFiles(uploadedFiles.filter((f) => f.id !== fileId));
    if (selectedFile?.id === fileId) {
      setSelectedFile(uploadedFiles.find((f) => f.id !== fileId) || null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const features = [
    {
      icon: Video,
      title: 'Generate Video',
      description: 'Create engaging explainer videos from your content',
      color: 'from-gold to-gold-light',
    },
    {
      icon: FileVideo,
      title: 'Create Explainer Videos',
      description: 'Transform complex topics into easy-to-understand videos',
      color: 'from-gold to-gold-light',
    },
    {
      icon: Headphones,
      title: 'Audio Summary',
      description: 'Get concise audio summaries of your documents',
      color: 'from-gold to-gold-light',
    },
    {
      icon: Volume2,
      title: 'Convert to Audio Format',
      description: 'Transform text into high-quality audio narration',
      color: 'from-gold to-gold-light',
    },
    {
      icon: Network,
      title: 'Mind Map',
      description: 'Visualize relationships and concepts in your content',
      color: 'from-gold to-gold-light',
    },
    {
      icon: Eye,
      title: 'Visualize Concepts',
      description: 'Create visual representations of key concepts',
      color: 'from-gold to-gold-light',
    },
    {
      icon: FileText,
      title: 'Flashcards',
      description: 'Generate interactive flashcards for quick learning',
      color: 'from-gold to-gold-light',
    },
  ];

  const handleFeatureClick = async (feature) => {
    if (!selectedFile) {
      alert('Please select a file first to use this feature.');
      return;
    }

    const interaction = interactions[selectedFile.interactionId];
    if (!interaction) {
      alert('File interaction not found. Please upload the file again.');
      return;
    }

    if (feature.title === 'Generate Video' || feature.title === 'Create Explainer Videos') {
      if (interaction.status === 'processing') {
        alert('Video is still being generated. Please wait...');
        return;
      }
      
      if (interaction.status === 'completed' && interaction.output?.videoUrl) {
        window.open(interaction.output.videoUrl, '_blank');
      } else {
        alert('Video is not available yet. Please wait for processing to complete.');
      }
    } else if (feature.title === 'Audio Summary' || feature.title === 'Convert to Audio Format') {
      if (interaction.status === 'completed' && interaction.output?.summaryText) {
        // Show summary in a modal or new page
        alert(`Summary:\n\n${interaction.output.summaryText.substring(0, 500)}...`);
      } else {
        alert('Summary is not available yet. Please wait for processing to complete.');
      }
    } else {
      alert(`${feature.title} feature is coming soon!`);
    }
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-navy-dark flex flex-col">
      <Navbar isAuth={true} />

      {/* Header */}
      <header className="bg-white dark:bg-navy border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-cream dark:hover:bg-navy-light rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-navy dark:text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-navy dark:text-white">Browse & Explore Tools</h1>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Upload your content and transform it with AI-powered tools
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMaterialsPanelOpen(!materialsPanelOpen)}
              className="lg:hidden p-2 hover:bg-cream dark:hover:bg-navy-light rounded-lg transition-colors"
            >
              {materialsPanelOpen ? (
                <X className="w-5 h-5 text-navy dark:text-white" />
              ) : (
                <ChevronRight className="w-5 h-5 text-navy dark:text-white" />
              )}
            </button>
            <button
              onClick={() => setToolsPanelOpen(!toolsPanelOpen)}
              className="lg:hidden p-2 hover:bg-cream dark:hover:bg-navy-light rounded-lg transition-colors"
            >
              {toolsPanelOpen ? (
                <X className="w-5 h-5 text-navy dark:text-white" />
              ) : (
                <ChevronRight className="w-5 h-5 text-navy dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Uploaded Materials Panel (Sliding) */}
        <div
          className={`${
            materialsPanelOpen ? 'w-full lg:w-96' : 'w-0'
          } bg-white dark:bg-navy border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col overflow-hidden`}
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-navy dark:text-white">Uploaded Materials</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {uploadedFiles.length} {uploadedFiles.length === 1 ? 'file' : 'files'} uploaded
              </p>
            </div>
            <button
              onClick={() => setMaterialsPanelOpen(false)}
              className="p-2 hover:bg-cream dark:hover:bg-navy-light rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>


          {/* Uploaded Files List */}
          <div className="flex-1 overflow-y-auto p-4">
            {uploadedFiles.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-3">
                  <File className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-sm font-semibold text-navy dark:text-white mb-1">
                  No files uploaded yet
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Upload your first file to get started
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedFile?.id === file.id
                        ? 'border-gold bg-gold/10 dark:bg-gold/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gold/50 bg-white dark:bg-navy'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 text-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-navy dark:text-white truncate mb-1">
                            {file.name}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <File className="w-3 h-3" />
                              {formatFileSize(file.size)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {file.uploadDate}
                            </span>
                            {processing[file.interactionId] && (
                              <span className="flex items-center gap-1 text-gold">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Processing...
                              </span>
                            )}
                            {file.status === 'completed' && (
                              <span className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="w-3 h-3" />
                                Ready
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleDeleteFile(file.id, e)}
                        className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center bg-cream dark:bg-navy-dark p-8">
          {/* Upload Section in Center */}
          <div className="w-full max-w-2xl mb-8">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 text-center cursor-pointer hover:border-gold hover:bg-gold/5 transition-all"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center">
                  <Upload className="w-10 h-10 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-navy dark:text-white">
                    Upload Your Content
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Drag & drop files here or click to browse
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Supported formats: PDF, DOC, DOCX, TXT, PPT, PPTX
                  </p>
                </div>
                <Button variant="primary" className="mt-2" disabled={uploading}>
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    'Choose Files'
                  )}
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
                onChange={handleFileUpload}
                multiple
              />
            </div>
          </div>

          {/* Selected File Info */}
          {selectedFile && (
            <div className="text-center max-w-md">
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-gold" />
              </div>
              <h2 className="text-xl font-bold text-navy dark:text-white mb-2">
                {selectedFile.name}
              </h2>
              {processing[selectedFile.interactionId] ? (
                <div className="flex items-center gap-2 text-gold">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Processing file... This may take a few minutes.
                  </p>
                </div>
              ) : interactions[selectedFile.interactionId]?.status === 'completed' ? (
                <div className="space-y-2">
                  <p className="text-green-600 dark:text-green-400 font-semibold">
                    ✅ Processing Complete!
                  </p>
                  {interactions[selectedFile.interactionId]?.output?.videoUrl && (
                    <a
                      href={interactions[selectedFile.interactionId].output.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-navy rounded-lg hover:bg-gold-light transition-colors"
                    >
                      <Play className="w-4 h-4" />
                      View Video
                    </a>
                  )}
                  {interactions[selectedFile.interactionId]?.output?.summaryText && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Summary available. Use tools from the right panel.
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  File selected. Choose a tool from the right panel to transform this content.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Side - Available Tools Panel (Sliding) */}
        <div
          className={`${
            toolsPanelOpen ? 'w-full lg:w-96' : 'w-0'
          } bg-white dark:bg-navy border-l border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col overflow-hidden`}
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-navy dark:text-white">Available Tools</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Transform your content
              </p>
            </div>
            <button
              onClick={() => setToolsPanelOpen(false)}
              className="p-2 hover:bg-cream dark:hover:bg-navy-light rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleFeatureClick(feature)}
                    disabled={!selectedFile}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedFile
                        ? 'border-gray-200 dark:border-gray-700 hover:border-gold hover:bg-gold/5 dark:hover:bg-gold/10 bg-white dark:bg-navy-light cursor-pointer'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-navy-dark opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}>
                        <Icon className="w-6 h-6 text-navy" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-navy dark:text-white mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {!selectedFile && (
              <div className="mt-6 p-4 bg-gold/10 dark:bg-gold/20 rounded-lg border border-gold/30">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-navy dark:text-white mb-1">
                      Select a file
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Choose a file from the left to enable these tools
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Toggle Buttons for Closed Panels */}
        {!materialsPanelOpen && (
          <button
            onClick={() => setMaterialsPanelOpen(true)}
            className="hidden lg:block fixed left-0 top-1/2 transform -translate-y-1/2 bg-gold hover:bg-gold-light text-navy p-3 rounded-r-lg shadow-lg transition-all z-20"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
        )}
        {!toolsPanelOpen && (
          <button
            onClick={() => setToolsPanelOpen(true)}
            className="hidden lg:block fixed right-0 top-1/2 transform -translate-y-1/2 bg-gold hover:bg-gold-light text-navy p-3 rounded-l-lg shadow-lg transition-all z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Browse;

