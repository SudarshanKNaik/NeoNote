import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import Card from '../../components/Card';
import Button from '../../components/Button';
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
  Users,
  Award,
  Calendar,
  CheckCircle,
  TrendingUp,
  BookOpen,
  GraduationCap,
} from 'lucide-react';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedNotebook, setSelectedNotebook] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, courses, assignments, grades
  const fileInputRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleFileUpload = () => {
    navigate('/browse');
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', active: activeTab === 'dashboard', onClick: () => { setActiveTab('dashboard'); setSelectedNotebook(null); } },
    { icon: BookOpen, label: 'My Courses', active: activeTab === 'courses', onClick: () => { setActiveTab('courses'); setSelectedNotebook(null); } },
    { icon: FileText, label: 'Assignments', active: activeTab === 'assignments', onClick: () => { setActiveTab('assignments'); setSelectedNotebook(null); } },
    { icon: Award, label: 'Grades', active: activeTab === 'grades', onClick: () => { setActiveTab('grades'); setSelectedNotebook(null); } },
    { icon: History, label: 'Recent Activity' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help & Support' },
  ];

  // Mock data - will be replaced with backend integration
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

  const enrolledCourses = [
    { id: 1, name: 'Mathematics 101', teacher: 'Dr. Smith', progress: 75, assignments: 3, nextDue: '2024-01-15' },
    { id: 2, name: 'Computer Science', teacher: 'Prof. Johnson', progress: 60, assignments: 2, nextDue: '2024-01-18' },
    { id: 3, name: 'English Literature', teacher: 'Ms. Williams', progress: 90, assignments: 1, nextDue: '2024-01-20' },
  ];

  const assignments = [
    { id: 1, title: 'Algebra Homework', course: 'Mathematics 101', dueDate: '2024-01-15', status: 'pending', submitted: false },
    { id: 2, title: 'Essay on Shakespeare', course: 'English Literature', dueDate: '2024-01-20', status: 'in-progress', submitted: false },
    { id: 3, title: 'Programming Project', course: 'Computer Science', dueDate: '2024-01-18', status: 'pending', submitted: false },
    { id: 4, title: 'Math Quiz', course: 'Mathematics 101', dueDate: '2024-01-12', status: 'submitted', submitted: true },
    { id: 5, title: 'Reading Assignment', course: 'English Literature', dueDate: '2024-01-10', status: 'graded', submitted: true, grade: 'A' },
  ];

  const grades = [
    { course: 'Mathematics 101', assignments: 5, average: 88, letterGrade: 'A' },
    { course: 'Computer Science', assignments: 4, average: 85, letterGrade: 'A' },
    { course: 'English Literature', assignments: 3, average: 92, letterGrade: 'A+' },
  ];

  const recentActivity = [
    { type: 'assignment', message: 'Submitted Algebra Homework', time: '2 hours ago' },
    { type: 'grade', message: 'Received grade A on Math Quiz', time: '1 day ago' },
    { type: 'course', message: 'Completed Chapter 5 in Computer Science', time: '2 days ago' },
  ];

  const renderDashboard = () => (
    <div className="flex-1 overflow-y-auto">
      {selectedNotebook ? (
        /* Notebook View */
        <div className="p-8 max-w-4xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => setSelectedNotebook(null)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gold mb-4 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Notebooks</span>
            </button>
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
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-navy dark:text-white">My Courses</h2>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Enroll in Course
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => (
          <Card key={course.id} className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-navy dark:text-white mb-2">{course.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Instructor: {course.teacher}</p>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                <span className="text-sm font-medium text-gold">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gold h-2 rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span>{course.assignments} assignments</span>
              <span>Due: {course.nextDue}</span>
            </div>
            <Button variant="secondary" className="w-full">
              View Course
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAssignments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-navy dark:text-white">My Assignments</h2>
      </div>
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-5 h-5 text-gold" />
                  <h3 className="text-lg font-semibold text-navy dark:text-white">{assignment.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{assignment.course}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">Due: {assignment.dueDate}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    assignment.status === 'submitted' || assignment.status === 'graded' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : assignment.status === 'in-progress'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                  }`}>
                    {assignment.status}
                  </span>
                  {assignment.grade && (
                    <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-xs font-medium">
                      Grade: {assignment.grade}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!assignment.submitted && (
                  <Button variant="primary" className="text-sm">
                    Submit
                  </Button>
                )}
                <Button variant="secondary" className="text-sm">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderGrades = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-navy dark:text-white">My Grades</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {grades.map((grade, index) => (
          <Card key={index} className="p-6">
            <h3 className="text-lg font-semibold text-navy dark:text-white mb-4">{grade.course}</h3>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-gold mb-2">{grade.average}%</div>
              <div className="text-xl font-semibold text-navy dark:text-white">{grade.letterGrade}</div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {grade.assignments} assignments graded
            </div>
            <Button variant="secondary" className="w-full mt-4">
              View Details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-cream dark:bg-navy-dark">
      {/* Left Sidebar */}
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
          {!sidebarCollapsed && activeTab === 'dashboard' && (
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

        {/* Notebooks List - Only show when on dashboard tab */}
        {!sidebarCollapsed && activeTab === 'dashboard' && (
          <div className="flex-1 overflow-y-auto p-2 border-b border-gray-200 dark:border-gray-700">
            <div className="mb-2 px-2">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Your Notebooks
              </h3>
            </div>
            <div className="space-y-1">
              {notebooks.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Book className="w-8 h-8 text-gold" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No notebooks yet. Click 'New Notebook' to get started!
                  </p>
                </div>
              ) : (
                notebooks.map((notebook) => (
                  <button
                    key={notebook.id}
                    onClick={() => setSelectedNotebook(notebook)}
                    className="w-full text-left p-3 rounded-lg hover:bg-cream dark:hover:bg-navy-light transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                        <Book className="w-5 h-5 text-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-navy dark:text-white truncate">
                          {notebook.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {notebook.date}
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {/* Menu Items */}
        {!sidebarCollapsed && (
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      item.active
                        ? 'bg-gold/10 text-gold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-cream dark:hover:bg-navy-light'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
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
                <div className="text-xs text-gray-500 dark:text-gray-400">Student</div>
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
                  placeholder={activeTab === 'dashboard' ? "Search in your notebooks..." : "Search courses, assignments..."}
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
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'courses' && (
          <div className="flex-1 overflow-y-auto p-8">
            {renderCourses()}
          </div>
        )}
        {activeTab === 'assignments' && (
          <div className="flex-1 overflow-y-auto p-8">
            {renderAssignments()}
          </div>
        )}
        {activeTab === 'grades' && (
          <div className="flex-1 overflow-y-auto p-8">
            {renderGrades()}
          </div>
        )}
      </main>

      {/* Chat Button */}
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

export default StudentDashboard;

