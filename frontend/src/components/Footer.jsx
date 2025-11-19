import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-navy dark:bg-navy-dark text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <i className="fas fa-graduation-cap text-2xl text-gold-light"></i>
              <span className="text-xl font-bold text-gold-light">NeoNote</span>
            </div>
            <p className="text-gray-300 mb-4">
              Transforming learning materials into engaging video content with AI-powered technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-navy-light rounded-full flex items-center justify-center hover:bg-gold hover:text-navy transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-navy-light rounded-full flex items-center justify-center hover:bg-gold hover:text-navy transition-colors">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-navy-light rounded-full flex items-center justify-center hover:bg-gold hover:text-navy transition-colors">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-navy-light rounded-full flex items-center justify-center hover:bg-gold hover:text-navy transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gold">Product</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/#features" className="hover:text-gold transition-colors">Features</Link></li>
              <li><Link to="/#how-it-works" className="hover:text-gold transition-colors">How It Works</Link></li>
              <li><Link to="/" className="hover:text-gold transition-colors">Pricing</Link></li>
              <li><Link to="/" className="hover:text-gold transition-colors">Use Cases</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gold">Resources</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-gold transition-colors">Blog</Link></li>
              <li><Link to="/" className="hover:text-gold transition-colors">Tutorials</Link></li>
              <li><Link to="/" className="hover:text-gold transition-colors">Documentation</Link></li>
              <li><Link to="/" className="hover:text-gold transition-colors">Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gold">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/#about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-gold transition-colors">Careers</Link></li>
              <li><Link to="/#contact" className="hover:text-gold transition-colors">Contact</Link></li>
              <li><Link to="/" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-light mt-8 pt-8 text-center text-gray-300">
          <p>© 2023 NeoNote. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

