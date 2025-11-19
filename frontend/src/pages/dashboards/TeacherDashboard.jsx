import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
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
  Plus,
  FileText,
  Users,
  Award,
  Calendar,
  TrendingUp,
  BookOpen,
  GraduationCap,
  BarChart3,
  UserPlus,
  ClipboardList,
  CheckCircle2,
  Clock,
  Edit,
  Trash2,
} from 'lucide-react';

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, classes, assignments, grades, analytics

  const menuItems = [
    { icon: Home, label: 'Dashboard', active: activeTab === 'overview', onClick: () => setActiveTab('overview') },
    { icon: Users, label: 'My Classes', active: activeTab === 'classes', onClick: () => setActiveTab('classes') },
    { icon: ClipboardList, label: 'Assignments', active: activeTab === 'assignments', onClick: () => setActiveTab('assignments') },
    { icon: Award, label: 'Gradebook', active: activeTab === 'grades', onClick: () => setActiveTab('grades') },
    { icon: BarChart3, label: 'Analytics', active: activeTab === 'analytics', onClick: () => setActiveTab('analytics') },
    { icon: History, label: 'Recent Activity' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help & Support' },
  ];

  // Mock data
  const stats = [
    { icon: Users, value: '5', label: 'Active Classes' },
    { icon: FileText, value: '12', label: 'Total Assignments' },
    { icon: GraduationCap, value: '142', label: 'Total Students' },
    { icon: TrendingUp, value: '82%', label: 'Avg. Performance' },
  ];

  const classes = [
    { id: 1, name: 'Mathematics 101', students: 28, assignments: 5, avgGrade: 85, nextClass: '2024-01-15' },
    { id: 2, name: 'Advanced Calculus', students: 22, assignments: 4, avgGrade: 78, nextClass: '2024-01-16' },
    { id: 3, name: 'Linear Algebra', students: 30, assignments: 6, avgGrade: 88, nextClass: '2024-01-17' },
    { id: 4, name: 'Statistics', students: 25, assignments: 3, avgGrade: 80, nextClass: '2024-01-18' },
    { id: 5, name: 'Discrete Math', students: 20, assignments: 4, avgGrade: 82, nextClass: '2024-01-19' },
  ];

  const assignments = [
    { id: 1, title: 'Algebra Homework', class: 'Mathematics 101', dueDate: '2024-01-15', submissions: 25, total: 28, status: 'active' },
    { id: 2, title: 'Calculus Quiz', class: 'Advanced Calculus', dueDate: '2024-01-18', submissions: 18, total: 22, status: 'active' },
    { id: 3, title: 'Linear Algebra Project', class: 'Linear Algebra', dueDate: '2024-01-20', submissions: 5, total: 30, status: 'active' },
    { id: 4, title: 'Statistics Assignment', class: 'Statistics', dueDate: '2024-01-12', submissions: 25, total: 25, status: 'graded' },
    { id: 5, title: 'Discrete Math Exam', class: 'Discrete Math', dueDate: '2024-01-10', submissions: 20, total: 20, status: 'graded' },
  ];

  const studentProgress = [
    { id: 1, name: 'John Doe', class: 'Mathematics 101', progress: 85, assignments: 5, avgGrade: 88 },
    { id: 2, name: 'Jane Smith', class: 'Mathematics 101', progress: 92, assignments: 5, avgGrade: 95 },
    { id: 3, name: 'Bob Johnson', class: 'Mathematics 101', progress: 78, assignments: 5, avgGrade: 82 },
    { id: 4, name: 'Alice Williams', class: 'Mathematics 101', progress: 90, assignments: 5, avgGrade: 92 },
  ];

  const classAnalytics = [
    { class: 'Mathematics 101', avgGrade: 85, completion: 89, engagement: 92 },
    { class: 'Advanced Calculus', avgGrade: 78, completion: 82, engagement: 85 },
    { class: 'Linear Algebra', avgGrade: 88, completion: 95, engagement: 88 },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-navy dark:text-white">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* My Classes */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-navy dark:text-white">My Classes</h2>
          <div className="flex gap-2">
            <Button variant="primary" onClick={() => setActiveTab('classes')} className="text-sm">
              <Plus className="w-4 h-4 mr-2" />
              Create Class
            </Button>
            <Button variant="secondary" onClick={() => setActiveTab('classes')} className="text-sm">
              View All
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.slice(0, 3).map((classItem) => (
            <div key={classItem.id} className="p-4 bg-cream dark:bg-navy-light rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-navy dark:text-white mb-2">{classItem.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Students:</span>
                  <span className="text-navy dark:text-white font-medium">{classItem.students}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Assignments:</span>
                  <span className="text-navy dark:text-white font-medium">{classItem.assignments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Avg. Grade:</span>
                  <span className="text-gold font-medium">{classItem.avgGrade}%</span>
                </div>
              </div>
              <Button variant="secondary" className="w-full mt-3 text-sm">
                Manage Class
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Assignments */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-navy dark:text-white">Recent Assignments</h2>
          <Button variant="secondary" onClick={() => setActiveTab('assignments')} className="text-sm">
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {assignments.slice(0, 3).map((assignment) => (
            <div key={assignment.id} className="flex items-center justify-between p-3 bg-cream dark:bg-navy-light rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gold" />
                <div>
                  <p className="font-medium text-navy dark:text-white">{assignment.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{assignment.class}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-navy dark:text-white">
                  {assignment.submissions}/{assignment.total} submitted
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Due: {assignment.dueDate}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderClasses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-navy dark:text-white">My Classes</h2>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Create New Class
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <Card key={classItem.id} className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-navy dark:text-white mb-2">{classItem.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Students:</span>
                  <span className="text-navy dark:text-white font-medium">{classItem.students}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Assignments:</span>
                  <span className="text-navy dark:text-white font-medium">{classItem.assignments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Avg. Grade:</span>
                  <span className="text-gold font-medium">{classItem.avgGrade}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Next Class:</span>
                  <span className="text-navy dark:text-white font-medium">{classItem.nextClass}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="primary" className="flex-1 text-sm">
                Manage
              </Button>
              <Button variant="secondary" className="flex-1 text-sm">
                View Students
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAssignments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-navy dark:text-white">Assignments</h2>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Create Assignment
        </Button>
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
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{assignment.class}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">Due: {assignment.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {assignment.submissions}/{assignment.total} submitted
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    assignment.status === 'graded' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                  }`}>
                    {assignment.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="primary" className="text-sm">
                  Grade
                </Button>
                <Button variant="secondary" className="text-sm">
                  View Details
                </Button>
                <button className="p-2 hover:bg-cream dark:hover:bg-navy-light rounded-lg">
                  <Edit className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
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
        <h2 className="text-2xl font-bold text-navy dark:text-white">Gradebook</h2>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Grade
        </Button>
      </div>
      <Card className="p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Class
          </label>
          <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-cream dark:bg-navy-light text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold">
            <option>Mathematics 101</option>
            <option>Advanced Calculus</option>
            <option>Linear Algebra</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Student</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Assignment 1</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Assignment 2</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Assignment 3</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Average</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentProgress.map((student) => (
                <tr key={student.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-sm text-navy dark:text-white">{student.name}</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-700 dark:text-gray-300">85</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-700 dark:text-gray-300">90</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-700 dark:text-gray-300">88</td>
                  <td className="py-3 px-4 text-center text-sm font-semibold text-gold">{student.avgGrade}%</td>
                  <td className="py-3 px-4 text-center">
                    <button className="text-gold hover:text-gold-light text-sm">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy dark:text-white">Class Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classAnalytics.map((analytics, index) => (
          <Card key={index} className="p-6">
            <h3 className="text-lg font-semibold text-navy dark:text-white mb-4">{analytics.class}</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Average Grade</span>
                  <span className="text-sm font-semibold text-gold">{analytics.avgGrade}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gold h-2 rounded-full"
                    style={{ width: `${analytics.avgGrade}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</span>
                  <span className="text-sm font-semibold text-gold">{analytics.completion}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${analytics.completion}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Engagement</span>
                  <span className="text-sm font-semibold text-gold">{analytics.engagement}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${analytics.engagement}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Student Progress Tracking */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-navy dark:text-white mb-4">Student Progress - Mathematics 101</h3>
        <div className="space-y-4">
          {studentProgress.map((student) => (
            <div key={student.id} className="p-4 bg-cream dark:bg-navy-light rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-navy dark:text-white">{student.name}</h4>
                <span className="text-sm font-medium text-gold">{student.avgGrade}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className="bg-gold h-2 rounded-full transition-all"
                  style={{ width: `${student.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>{student.assignments} assignments completed</span>
                <span>Progress: {student.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
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
        </div>

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

        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 p-2 hover:bg-cream dark:hover:bg-navy-light rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-gold to-gold-light rounded-full flex items-center justify-center text-navy font-semibold text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'T'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-navy dark:text-white truncate">
                  {user?.name || 'Teacher'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Teacher</div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-80'} transition-all duration-300 flex flex-col`}>
        <header className="bg-white dark:bg-navy border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search classes, students, assignments..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-cream dark:bg-navy-light text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <button className="p-2 hover:bg-cream dark:hover:bg-navy-light rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'classes' && renderClasses()}
          {activeTab === 'assignments' && renderAssignments()}
          {activeTab === 'grades' && renderGrades()}
          {activeTab === 'analytics' && renderAnalytics()}
        </div>
      </main>

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

export default TeacherDashboard;

