import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { ArrowLeft, GraduationCap, User, Shield } from 'lucide-react';

const CollegeAccess = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [collegeId, setCollegeId] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const roles = [
    {
      id: 'student',
      title: 'Student',
      icon: GraduationCap,
      description: 'Access your student portal and learning materials',
      color: 'from-gold to-gold-light',
    },
    {
      id: 'teacher',
      title: 'Teacher',
      icon: User,
      description: 'Manage your classes and create learning content',
      color: 'from-navy to-navy-light',
    },
    {
      id: 'principal',
      title: 'Principal',
      icon: Shield,
      description: 'Administrative access to institution dashboard',
      color: 'from-gold to-navy',
    },
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRole || !collegeId || !password) {
      alert('Please select a role and enter your credentials');
      return;
    }
    // Simulate login
    const roleName = roles.find(r => r.id === selectedRole)?.title || 'User';
    login({ 
      email: collegeId, 
      name: `${roleName} - ${collegeId}`,
      role: selectedRole 
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-navy-dark flex flex-col">
      <Navbar />
      
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="w-full max-w-4xl">
          {/* Back Button */}
          <button
            onClick={() => navigate('/get-started')}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gold mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Login</span>
          </button>

          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            College Access Portal
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            Select your role and sign in to access your portal
          </p>

          {!selectedRole ? (
            /* Role Selection */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className="glass-card p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                  >
                    <div className={`w-20 h-20 bg-gradient-to-br ${role.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-navy dark:text-white group-hover:text-gold transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {role.description}
                    </p>
                  </button>
                );
              })}
            </div>
          ) : (
            /* Login Form */
            <div className="glass-card max-w-md mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {(() => {
                    const RoleIcon = roles.find(r => r.id === selectedRole)?.icon;
                    return RoleIcon ? (
                      <div className={`w-12 h-12 bg-gradient-to-br ${roles.find(r => r.id === selectedRole).color} rounded-lg flex items-center justify-center`}>
                        <RoleIcon className="w-6 h-6 text-white" />
                      </div>
                    ) : null;
                  })()}
                  <div>
                    <h3 className="text-xl font-bold text-navy dark:text-white">
                      {roles.find(r => r.id === selectedRole)?.title} Login
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Enter your credentials to continue
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRole(null)}
                  className="text-gray-400 hover:text-gold transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    College ID or Email
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your College ID or Email"
                    value={collegeId}
                    onChange={(e) => setCollegeId(e.target.value)}
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-field"
                  />
                </div>
                <Button type="submit" variant="primary" className="w-full">
                  Sign In as {roles.find(r => r.id === selectedRole)?.title}
                </Button>
                <div className="text-center mt-4 text-sm text-gray-700 dark:text-gray-400">
                  Need help?{' '}
                  <a href="#" className="text-gold font-semibold hover:underline">
                    Contact your institution
                  </a>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CollegeAccess;

