import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import apiClient from '../utils/api';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' // student, teacher, guest
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // roll number removed; role is optional (defaults to 'student')

    setLoading(true);

    try {
      const response = await apiClient.post('/api/v1/auth/student/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
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
      setError(err.message || 'Registration failed. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-navy-dark flex flex-col">
      {/* Home icon link */}
      <div className="fixed top-0 left-0 p-4 z-50">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <i className="fas fa-graduation-cap text-2xl text-gold-light"></i>
          <span className="text-2xl font-bold text-gold-light">NeoNote</span>
        </Link>
      </div>
      
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-card w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gold">Create Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="input-field"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="input-field"
            />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="role" value="student" checked={formData.role === 'student'} onChange={handleChange} />
                <span className="ml-1">Student</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="role" value="teacher" checked={formData.role === 'teacher'} onChange={handleChange} />
                <span className="ml-1">Teacher</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="role" value="guest" checked={formData.role === 'guest'} onChange={handleChange} />
                <span className="ml-1">Guest</span>
              </label>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              minLength={6}
              className="input-field"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
              className="input-field"
            />
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
            <div className="text-center mt-4 text-sm text-gray-700 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-gold font-semibold hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Signup;

