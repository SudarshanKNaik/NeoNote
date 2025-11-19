import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import apiClient from '../utils/api';

const Login = () => {
  const [generalEmail, setGeneralEmail] = useState('');
  const [generalPassword, setGeneralPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGeneralSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiClient.post('/api/v1/auth/student/login', {
        email: generalEmail,
        password: generalPassword
      });

      if (response.success) {
        // Store token
        if (response.data.accessToken) {
          localStorage.setItem('token', response.data.accessToken);
        }
        
        // Update auth store
        login(response.data.user);
        
        // Navigate to dashboard
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCollegeAccess = () => {
    navigate('/college-access');
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-navy-dark flex flex-col">
      <Navbar />
      
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="w-full max-w-5xl">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Welcome! Choose your sign-in method
          </h3>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {/* General User Login */}
            <div className="glass-card w-full md:w-96">
              <h2 className="text-2xl font-bold text-center mb-6 text-gold">Sign In</h2>
              <form onSubmit={handleGeneralSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded">
                    {error}
                  </div>
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={generalEmail}
                  onChange={(e) => setGeneralEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="input-field"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={generalPassword}
                  onChange={(e) => setGeneralPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="input-field"
                />
                <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
                <div className="text-center mt-4 text-sm text-gray-700 dark:text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-gold font-semibold hover:underline">
                    Sign up
                  </Link>
                </div>
              </form>
            </div>

            {/* College Access */}
            <div className="glass-card w-full md:w-96">
              <h2 className="text-2xl font-bold text-center mb-6 text-gold">College Access</h2>
              <div className="space-y-4">
                <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
                  Access your institution's learning portal
                </p>
                <Button 
                  type="button" 
                  variant="primary" 
                  className="w-full"
                  onClick={handleCollegeAccess}
                >
                  Continue to College Portal
                </Button>
                <div className="text-center mt-4 text-sm text-gray-700 dark:text-gray-400">
                  Need help?{' '}
                  <a href="#" className="text-gold font-semibold hover:underline">
                    Contact your institution
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;

