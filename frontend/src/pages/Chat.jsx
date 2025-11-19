import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { ArrowLeft, Send, Upload, FileText, ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';
import apiClient from '../utils/api';

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const chatEndRef = useRef(null);

  // Load chat history on mount
  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      const response = await apiClient.get('/api/v1/ai/chat');
      if (response.success && response.data.length > 0) {
        const history = response.data[0];
        setSessionId(history.sessionId);
        // Convert chat history to message format
        const formattedMessages = history.messages.map((msg, idx) => ({
          id: idx + 1,
          text: msg.content,
          sender: msg.role === 'user' ? 'user' : 'assistant',
          timestamp: msg.timestamp || new Date(),
          messageId: msg._id,
          feedback: msg.feedback
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      id: messages.length + 1,
      text: input.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await apiClient.post('/api/v1/ai/chat', {
        message: input.trim(),
        sessionId: sessionId
      });

      if (response.success) {
        const newSessionId = response.data.sessionId || sessionId;
        if (!sessionId) setSessionId(newSessionId);

        const assistantMessage = {
          id: messages.length + 2,
          text: response.data.reply,
          sender: 'assistant',
          timestamp: new Date(),
          messageId: response.data.messageId
        };

        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (messageId, feedback) => {
    if (!sessionId || !messageId) return;

    try {
      await apiClient.post('/api/v1/ai/feedback', {
        sessionId: sessionId,
        messageId: messageId,
        feedback: feedback
      });

      // Update message with feedback
      setMessages(prev => prev.map(msg => 
        msg.messageId === messageId 
          ? { ...msg, feedback }
          : msg
      ));
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const isPdf = file.type === 'application/pdf';
    const isPpt = file.type === 'application/vnd.ms-powerpoint' || 
                  file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation';

    try {
      let endpoint = '';
      if (isPdf) {
        endpoint = '/api/v1/ai/upload-pdf';
      } else if (isPpt) {
        endpoint = '/api/v1/ai/upload-ppt';
      } else {
        alert('Please upload a PDF or PPT file');
        setUploading(false);
        return;
      }

      const response = await apiClient.uploadFile(endpoint, file);

      if (response.success) {
        const interaction = response.data;
        const message = {
          id: messages.length + 1,
          text: `File "${file.name}" uploaded successfully! ${isPdf ? 'Generating video and summary...' : 'Generating video...'}`,
          sender: 'assistant',
          timestamp: new Date(),
          interactionId: interaction._id,
          status: interaction.status
        };
        setMessages(prev => [...prev, message]);

        // Poll for completion
        if (interaction.status === 'processing') {
          pollInteractionStatus(interaction._id, file.name, isPdf);
        } else if (interaction.status === 'completed') {
          showCompletionMessage(interaction, file.name, isPdf);
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      const errorMessage = {
        id: messages.length + 1,
        text: `Error uploading file: ${error.message}`,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setUploading(false);
    }
  };

  const pollInteractionStatus = async (interactionId, fileName, isPdf) => {
    const maxAttempts = 30;
    let attempts = 0;

    const poll = setInterval(async () => {
      attempts++;
      try {
        const response = await apiClient.get(`/api/v1/ai/interactions/${interactionId}/status`);
        if (response.success) {
          const interaction = response.data;
          if (interaction.status === 'completed') {
            clearInterval(poll);
            showCompletionMessage(interaction, fileName, isPdf);
          } else if (interaction.status === 'failed') {
            clearInterval(poll);
            const errorMessage = {
              id: messages.length + 1,
              text: `Processing failed: ${interaction.errorMessage || 'Unknown error'}`,
              sender: 'assistant',
              timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
          }
        }
      } catch (error) {
        console.error('Error polling status:', error);
      }

      if (attempts >= maxAttempts) {
        clearInterval(poll);
      }
    }, 2000);
  };

  const showCompletionMessage = (interaction, fileName, isPdf) => {
    let messageText = `✅ "${fileName}" processed successfully!\n\n`;
    
    if (interaction.output?.videoUrl) {
      messageText += `🎥 Video: ${interaction.output.videoUrl}\n`;
    }
    
    if (isPdf && interaction.output?.summaryText) {
      messageText += `📄 Summary generated\n`;
    }

    const completionMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: 'assistant',
      timestamp: new Date(),
      interaction: interaction
    };
    setMessages(prev => [...prev, completionMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, chatEndRef]);

  return (
    <div className="min-h-screen bg-cream dark:bg-navy-dark flex flex-col">
      <Navbar isAuth={true} />

      {/* Header */}
      <header className="bg-white dark:bg-navy border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-cream dark:hover:bg-navy-light rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-navy dark:text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
              <i className="fas fa-comment text-gold text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-navy dark:text-white">NeoNote Assistant</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered learning assistant</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-comment text-gold text-4xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-navy dark:text-white mb-3">
                Start a Conversation
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                Ask me anything about your learning materials, or get help with creating videos, summaries, and more.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg">
                {[
                  'Generate a video from my notes',
                  'Create a summary of my document',
                  'Explain this concept',
                  'Help me create flashcards',
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInput(suggestion);
                      handleSend();
                    }}
                    className="p-3 text-left bg-white dark:bg-navy rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gold hover:bg-gold/5 dark:hover:bg-gold/10 transition-all text-sm text-navy dark:text-white"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-gold text-navy rounded-br-sm'
                      : 'bg-white dark:bg-navy-light text-gray-900 dark:text-white rounded-bl-sm shadow-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  
                  {/* Show video/interaction if available */}
                  {message.interaction?.output?.videoUrl && (
                    <div className="mt-3">
                      <a
                        href={message.interaction.output.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold hover:underline text-xs flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3" />
                        View Video
                      </a>
                    </div>
                  )}

                  {/* Feedback buttons for assistant messages */}
                  {message.sender === 'assistant' && message.messageId && (
                    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Was this helpful?</span>
                      <button
                        onClick={() => handleFeedback(message.messageId, 'relevant')}
                        className={`p-1 rounded ${message.feedback === 'relevant' ? 'bg-green-100 dark:bg-green-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        title="Relevant"
                      >
                        <ThumbsUp className={`w-4 h-4 ${message.feedback === 'relevant' ? 'text-green-600' : 'text-gray-400'}`} />
                      </button>
                      <button
                        onClick={() => handleFeedback(message.messageId, 'not_relevant')}
                        className={`p-1 rounded ${message.feedback === 'not_relevant' ? 'bg-red-100 dark:bg-red-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        title="Not Relevant"
                      >
                        <ThumbsDown className={`w-4 h-4 ${message.feedback === 'not_relevant' ? 'text-red-600' : 'text-gray-400'}`} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-navy-light rounded-2xl px-4 py-3 rounded-bl-sm shadow-md">
                <Loader2 className="w-5 h-5 animate-spin text-gold" />
              </div>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="bg-white dark:bg-navy border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <label className="cursor-pointer p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Upload className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <input
                type="file"
                className="hidden"
                accept=".pdf,.ppt,.pptx"
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your learning materials..."
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold bg-white dark:bg-navy-light text-gray-900 dark:text-white"
              disabled={loading || uploading}
            />
            <Button
              variant="primary"
              onClick={handleSend}
              disabled={!input.trim() || loading || uploading}
              className="px-6"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Press Enter to send, Shift+Enter for new line
            </p>
            {uploading && (
              <p className="text-xs text-gold flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                Uploading and processing...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

