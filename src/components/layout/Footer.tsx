
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brown-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/pics/95624b19-44de-40fd-b2cd-33af192bdbba.png" 
                alt="Logo" 
                className="h-10 w-10 object-contain bg-white/20 rounded-md p-1"
              />
              <span className="font-serif text-xl font-bold text-white">LazyNinja</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Creating digital experiences that blend artistry with functionality. 
              I transform ideas into impactful digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/projects" className="text-gray-300 hover:text-white transition-colors">
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink to="/inqury" className="text-gray-300 hover:text-white transition-colors">
                  Inquries
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Me
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Client Login
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-medium text-lg mb-4">Contact Me</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">tyler@lazyninja.co</li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} LazyNinja LLC. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <NavLink to="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
