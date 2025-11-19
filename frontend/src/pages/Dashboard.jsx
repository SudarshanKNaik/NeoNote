import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import Card from '../components/Card';
import Button from '../components/Button';
import {
  Home,
  Book,
  History,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Upload,
  Video,
  Headphones,
  Network,
  Languages,
  LogOut,
  Plus,
  FileText,
  MoreVertical,
  Clock,
  Sparkles,
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedNotebook, setSelectedNotebook] = useState(null);
  const fileInputRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleFileUpload = () => {
    navigate('/browse');
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Book, label: 'My Notebooks' },
    { icon: History, label: 'Recent Activity' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help & Support' },
  ];

  const stats = [
    { icon: Book, value: '0', label: 'Notebooks' },
    { icon: Video, value: '0', label: 'Videos Created' },
    { icon: History, value: '0h', label: 'Learning Time' },
    { icon: Network, value: '0%', label: 'Progress' },
  ];

  const notebooks = [];

  const activities = [];

  const generationOptions = [
    { icon: Video, title: 'Generate Video', desc: 'Create explainer videos' },
    { icon: Headphones, title: 'Audio Summary', desc: 'Convert to audio format' },
    { icon: Network, title: 'Mind Map', desc: 'Visualize concepts' },
    { icon: Languages, title: 'Translate', desc: 'Multiple languages' },
  ];

  return (
    <div className="flex min-h-screen bg-cream dark:bg-navy-dark">
      {/* Left Sidebar - Notebooks List */}
      <aside
        className={`${
          sidebarCollapsed ? 'w-20' : 'w-80'
        } bg-white dark:bg-navy border-r border-gray-200 dark:border-gray-700 transition-all duration-300 fixed h-full z-40 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link to="/" className="hover:bg-cream dark:hover:bg-navy-light rounded-lg p-1">
                <Home className="w-6 h-6 text-gold-light" />
              </Link>
              {!sidebarCollapsed && <span className="text-xl font-bold text-gold-light">NeoNote</span>}
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 hover:bg-cream dark:hover:bg-navy-light rounded-lg transition-colors"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
          {!sidebarCollapsed && (
            <Button
              variant="primary"
              onClick={() => navigate('/browse')}
              className="w-full justify-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Notebook
            </Button>
          )}
        </div>

        {/* Notebooks List */}
        {!sidebarCollapsed && (
          <div className="flex-1 overflow-y-auto p-2">
            <div className="mb-2 px-2">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Your Notebooks
              </h3>
            </div>
            <div className="space-y-1">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Book className="w-8 h-8 text-gold" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No notebooks yet. Click 'New Notebook' to get started!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar Footer */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 p-2 hover:bg-cream dark:hover:bg-navy-light rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-gold to-gold-light rounded-full flex items-center justify-center text-navy font-semibold text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-navy dark:text-white truncate">
                  {user?.name || 'User'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Free Plan</div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-80'} transition-all duration-300 flex flex-col`}>
        {/* Top Header */}
        <header className="bg-white dark:bg-navy border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search in your notebooks..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-cream dark:bg-navy-light text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <Button
                variant="secondary"
                onClick={handleFileUpload}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload
              </Button>
              <button className="p-2 hover:bg-cream dark:hover:bg-navy-light rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedNotebook ? (
            /* Notebook View */
            <div className="p-8 max-w-4xl mx-auto">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                    <i className={`fas fa-${selectedNotebook.icon} text-gold text-xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-navy dark:text-white mb-1">
                      {selectedNotebook.title}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedNotebook.date} • {selectedNotebook.sources} sources
                    </p>
                  </div>
                </div>
              </div>

              {/* Notebook Content Area */}
              <Card className="min-h-[500px] p-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-navy dark:text-white mb-3">Overview</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedNotebook.description}
                    </p>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h2 className="text-xl font-semibold text-navy dark:text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {generationOptions.map((option, index) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={index}
                            className="p-4 bg-cream dark:bg-navy-light rounded-lg hover:bg-gold/10 border border-gray-200 dark:border-gray-700 hover:border-gold transition-all text-center group"
                          >
                            <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-gold group-hover:scale-110 transition-transform">
                              <Icon className="w-6 h-6 text-gold group-hover:text-navy" />
                            </div>
                            <div className="font-medium text-sm text-navy dark:text-white">{option.title}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            /* Empty State - No Notebook Selected */
            <div className="flex items-center justify-center h-full p-8">
              <div className="text-center max-w-md">
                <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-12 h-12 text-gold" />
                </div>
                <h2 className="text-2xl font-bold text-navy dark:text-white mb-3">
                  Welcome to Your Learning Journey
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Create your first notebook to start converting your learning materials into engaging videos and resources.
                </p>
                <Button variant="primary" onClick={() => navigate('/browse')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Notebook
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Chat Button - Opens Chat Page */}
      <button
        onClick={() => navigate('/chat')}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gold text-navy rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center z-50"
        aria-label="Open chat"
      >
        <i className="fas fa-comment text-2xl"></i>
      </button>
    </div>
  );
};

export default Dashboard;

