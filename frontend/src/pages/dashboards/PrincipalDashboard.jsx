import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/Card';
import Button from '../../components/Button';
import {
  Home,
  History,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  Users,
  Award,
  TrendingUp,
  BookOpen,
  GraduationCap,
  BarChart3,
  UserPlus,
  Shield,
  Building2,
  ClipboardList,
  Calendar,
  Edit,
  Trash2,
  Mail,
  Bell,
} from 'lucide-react';

const PrincipalDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, teachers, students, courses, analytics

  const menuItems = [
    { icon: Home, label: 'Dashboard', active: activeTab === 'overview', onClick: () => setActiveTab('overview') },
    { icon: Users, label: 'Teachers', active: activeTab === 'teachers', onClick: () => setActiveTab('teachers') },
    { icon: GraduationCap, label: 'Students', active: activeTab === 'students', onClick: () => setActiveTab('students') },
    { icon: BookOpen, label: 'Courses', active: activeTab === 'courses', onClick: () => setActiveTab('courses') },
    { icon: BarChart3, label: 'Analytics', active: activeTab === 'analytics', onClick: () => setActiveTab('analytics') },
    { icon: History, label: 'Recent Activity' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help & Support' },
  ];

  // Mock data
  const stats = [
    { icon: Users, value: '45', label: 'Total Teachers' },
    { icon: GraduationCap, value: '1,250', label: 'Total Students' },
    { icon: BookOpen, value: '120', label: 'Active Courses' },
    { icon: TrendingUp, value: '87%', label: 'Overall Performance' },
  ];

  const teachers = [
    { id: 1, name: 'Dr. Smith', email: 'smith@school.edu', classes: 5, students: 142, status: 'active' },
    { id: 2, name: 'Prof. Johnson', email: 'johnson@school.edu', classes: 4, students: 120, status: 'active' },
    { id: 3, name: 'Ms. Williams', email: 'williams@school.edu', classes: 6, students: 180, status: 'active' },
    { id: 4, name: 'Dr. Brown', email: 'brown@school.edu', classes: 3, students: 95, status: 'active' },
    { id: 5, name: 'Mr. Davis', email: 'davis@school.edu', classes: 5, students: 150, status: 'active' },
  ];

  const students = [
    { id: 1, name: 'John Doe', email: 'john@student.edu', grade: '10th', courses: 5, avgGrade: 88, status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@student.edu', grade: '11th', courses: 6, avgGrade: 95, status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@student.edu', grade: '10th', courses: 5, avgGrade: 82, status: 'active' },
    { id: 4, name: 'Alice Williams', email: 'alice@student.edu', grade: '12th', courses: 7, avgGrade: 92, status: 'active' },
  ];

  const courses = [
    { id: 1, name: 'Mathematics 101', teacher: 'Dr. Smith', students: 28, status: 'active' },
    { id: 2, name: 'Computer Science', teacher: 'Prof. Johnson', students: 35, status: 'active' },
    { id: 3, name: 'English Literature', teacher: 'Ms. Williams', students: 30, status: 'active' },
    { id: 4, name: 'Physics', teacher: 'Dr. Brown', students: 25, status: 'active' },
    { id: 5, name: 'Chemistry', teacher: 'Mr. Davis', students: 32, status: 'active' },
  ];

  const institutionAnalytics = {
    overallPerformance: 87,
    attendanceRate: 92,
    completionRate: 85,
    engagementScore: 89,
    topPerformingClasses: [
      { name: 'Mathematics 101', avgGrade: 88, students: 28 },
      { name: 'Computer Science', avgGrade: 85, students: 35 },
      { name: 'English Literature', avgGrade: 92, students: 30 },
    ],
    recentActivity: [
      { type: 'teacher', message: 'Dr. Smith created new assignment', time: '2 hours ago' },
      { type: 'student', message: '50 students submitted assignments', time: '5 hours ago' },
      { type: 'course', message: 'New course "Advanced Physics" added', time: '1 day ago' },
    ],
  };

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

      {/* Institution Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-navy dark:text-white mb-4">Institution Performance</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Overall Performance</span>
                <span className="text-sm font-semibold text-gold">{institutionAnalytics.overallPerformance}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gold h-2 rounded-full"
                  style={{ width: `${institutionAnalytics.overallPerformance}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Attendance Rate</span>
                <span className="text-sm font-semibold text-gold">{institutionAnalytics.attendanceRate}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${institutionAnalytics.attendanceRate}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</span>
                <span className="text-sm font-semibold text-gold">{institutionAnalytics.completionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${institutionAnalytics.completionRate}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Engagement Score</span>
                <span className="text-sm font-semibold text-gold">{institutionAnalytics.engagementScore}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${institutionAnalytics.engagementScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-navy dark:text-white mb-4">Top Performing Classes</h2>
          <div className="space-y-3">
            {institutionAnalytics.topPerformingClasses.map((classItem, index) => (
              <div key={index} className="p-3 bg-cream dark:bg-navy-light rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-navy dark:text-white">{classItem.name}</h3>
                  <span className="text-sm font-medium text-gold">{classItem.avgGrade}%</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">{classItem.students} students</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-navy dark:text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {institutionAnalytics.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-cream dark:bg-navy-light rounded-lg">
              <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center">
                <Bell className="w-4 h-4 text-gold" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-navy dark:text-white">{activity.message}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderTeachers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-navy dark:text-white">Teacher Management</h2>
        <Button variant="primary">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Teacher
        </Button>
      </div>
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Classes</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Students</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-sm text-navy dark:text-white">{teacher.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{teacher.email}</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-700 dark:text-gray-300">{teacher.classes}</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-700 dark:text-gray-300">{teacher.students}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">
                      {teacher.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1 hover:bg-cream dark:hover:bg-navy-light rounded">
                        <Edit className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                      <button className="p-1 hover:bg-cream dark:hover:bg-navy-light rounded">
                        <Mail className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-navy dark:text-white">Student Management</h2>
        <Button variant="primary">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Grade</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Courses</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Avg. Grade</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-sm text-navy dark:text-white">{student.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{student.email}</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-700 dark:text-gray-300">{student.grade}</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-700 dark:text-gray-300">{student.courses}</td>
                  <td className="py-3 px-4 text-center text-sm font-semibold text-gold">{student.avgGrade}%</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">
                      {student.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1 hover:bg-cream dark:hover:bg-navy-light rounded">
                        <Edit className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                      <button className="p-1 hover:bg-cream dark:hover:bg-navy-light rounded">
                        <Mail className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-navy dark:text-white">Course Management</h2>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-navy dark:text-white mb-2">{course.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Instructor: {course.teacher}</p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">Students: {course.students}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                course.status === 'active'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
              }`}>
                {course.status}
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="primary" className="flex-1 text-sm">
                Manage
              </Button>
              <button className="p-2 hover:bg-cream dark:hover:bg-navy-light rounded-lg">
                <Edit className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy dark:text-white">Institution Analytics</h2>
      
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-navy dark:text-white mb-4">Performance Trends</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">This Month</span>
                <span className="text-sm font-semibold text-gold">87%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gold h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Last Month</span>
                <span className="text-sm font-semibold text-gold">85%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gold h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-navy dark:text-white mb-4">Enrollment Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Students</span>
              <span className="text-2xl font-bold text-navy dark:text-white">1,250</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Teachers</span>
              <span className="text-2xl font-bold text-navy dark:text-white">45</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active Courses</span>
              <span className="text-2xl font-bold text-navy dark:text-white">120</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Performers */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-navy dark:text-white mb-4">Top Performing Classes</h3>
        <div className="space-y-3">
          {institutionAnalytics.topPerformingClasses.map((classItem, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-cream dark:bg-navy-light rounded-lg">
              <div>
                <h4 className="font-semibold text-navy dark:text-white">{classItem.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{classItem.students} students</p>
              </div>
              <span className="text-lg font-bold text-gold">{classItem.avgGrade}%</span>
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
                {user?.name?.charAt(0)?.toUpperCase() || 'P'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-navy dark:text-white truncate">
                  {user?.name || 'Principal'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Administrator</div>
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
                  placeholder="Search teachers, students, courses..."
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
          {activeTab === 'teachers' && renderTeachers()}
          {activeTab === 'students' && renderStudents()}
          {activeTab === 'courses' && renderCourses()}
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

export default PrincipalDashboard;

