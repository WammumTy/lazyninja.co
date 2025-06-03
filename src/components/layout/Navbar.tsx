
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="py-4 px-6 md:px-12 w-full bg-white/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-2">
          <img 
            src="/pics/95624b19-44de-40fd-b2cd-33af192bdbba.png" 
            alt="Logo" 
            className="h-10 w-10 object-contain"
          />
          <span className="font-serif text-xl font-bold text-brown-800">LazyNinja</span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/projects" className={({isActive}) => 
            isActive ? "nav-link nav-link-active" : "nav-link"
          }>
            Projects
          </NavLink>
          <NavLink to="/inqury" className={({isActive}) => 
            isActive ? "nav-link nav-link-active" : "nav-link"
          }>
            Inquries
          </NavLink>
          <NavLink to="/contact" className={({isActive}) => 
            isActive ? "nav-link nav-link-active" : "nav-link"
          }>
            Contact
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-brown-800" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md py-4 px-6 flex flex-col gap-4 animate-fade-in">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/projects" 
            className={({isActive}) => 
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
            onClick={() => setIsOpen(false)}
          >
            Projects
          </NavLink>
          <NavLink 
            to="/inqury" 
            className={({isActive}) => 
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
            onClick={() => setIsOpen(false)}
          >
            Inquries
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({isActive}) => 
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
