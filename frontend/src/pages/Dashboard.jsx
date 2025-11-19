import { useAuth } from '../hooks/useAuth';
import StudentDashboard from './dashboards/StudentDashboard';
import TeacherDashboard from './dashboards/TeacherDashboard';
import PrincipalDashboard from './dashboards/PrincipalDashboard';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Route to appropriate dashboard based on user role
  const userRole = user?.role || 'student';
  
  if (userRole === 'teacher') {
    return <TeacherDashboard />;
  }
  
  if (userRole === 'principal' || userRole === 'admin') {
    return <PrincipalDashboard />;
  }
  
  // Default to student dashboard
  return <StudentDashboard />;
};

export default Dashboard;

