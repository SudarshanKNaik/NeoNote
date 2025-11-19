import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const Navbar = ({ isAuth = false }) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 bg-navy/95 backdrop-blur-lg transition-all duration-300 ${
      scrolled ? 'shadow-lg py-4' : 'shadow-md py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <i className="fas fa-graduation-cap text-2xl text-gold-light"></i>
            <span className="text-2xl font-bold text-gold-light">NeoNote</span>
          </Link>

          <div className="flex items-center gap-8">
            {!isAuth ? (
              <>
                <ul className="hidden md:flex items-center gap-8">
                  <li>
                    <a
                      href="#about"
                      onClick={(e) => handleNavClick(e, 'about')}
                      className="text-white dark:text-white hover:text-gold font-medium transition-colors relative group"
                    >
                      About
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#features"
                      onClick={(e) => handleNavClick(e, 'features')}
                      className="text-white dark:text-white hover:text-gold font-medium transition-colors relative group"
                    >
                      Features
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>

                </ul>
                <Link
                  to="/login"
                  className="text-white dark:text-white hover:text-gold font-medium transition-colors hidden md:block"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary text-sm py-2 px-4"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="text-white dark:text-white hover:text-gold font-medium transition-colors"
              >
                Dashboard
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-cream dark:hover:bg-navy-light transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-white dark:text-gold" />
              ) : (
                <Moon className="w-5 h-5 text-white dark:text-gold" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

