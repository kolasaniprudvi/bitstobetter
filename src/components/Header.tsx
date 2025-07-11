import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import SSLIndicator from './SSLIndicator';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  const services = [
    { name: 'Smart Portfolio Management', path: '/services/investment-management' },
    { name: 'Wealth Planning', path: '/services/wealth-planning' },
    { name: 'Retirement Planning', path: '/services/retirement-planning' },
    { name: 'Financial Planning', path: '/services/financial-planning' },
    { name: 'Real Estate Investment', path: '/services/real-estate-investment' },
    { name: 'Business Solutions', path: '/services/business-solutions' }
  ];

  const isActive = (path: string) => location.pathname === path;
  const isServicesActive = () => location.pathname.startsWith('/services');

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg fixed w-full top-0 z-50 transition-colors duration-200" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
          <SSLIndicator />
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-400">
                <Link to="/" aria-label="BitsToBetter - Home">BitsToBetter</Link>
              </h1>
            </div>
          </div>
          
          <nav className="hidden md:block" role="navigation" aria-label="Main navigation">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                to="/" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-blue-900 dark:text-blue-400 border-b-2 border-blue-900 dark:border-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400'
                }`}
              >
                Home
              </Link>
              
              <div className="relative group">
                <button 
                  className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                    isServicesActive() 
                      ? 'text-blue-900 dark:text-blue-400 border-b-2 border-blue-900 dark:border-blue-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400'
                  }`}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  Services
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                
                <div 
                  className={`absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg transition-all duration-200 ${
                    isServicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <div className="p-2">
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className={`block px-4 py-3 rounded-md text-sm transition-colors ${
                          isActive(service.path)
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              <Link 
                to="/about" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/about') 
                    ? 'text-blue-900 dark:text-blue-400 border-b-2 border-blue-900 dark:border-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400'
                }`}
              >
                About
              </Link>
              <Link 
                to="/team" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/team') 
                    ? 'text-blue-900 dark:text-blue-400 border-b-2 border-blue-900 dark:border-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400'
                }`}
              >
                Team
              </Link>
              <Link 
                to="/contact" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/contact') 
                    ? 'text-blue-900 dark:text-blue-400 border-b-2 border-blue-900 dark:border-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400'
                }`}
              >
                Contact
              </Link>
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Phone className="w-4 h-4" />
              <span>+1-555-BITS-2-BETTER</span>
            </div>
            <Link 
              to="/contact"
              className="bg-blue-900 dark:bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 dark:hover:bg-blue-600 transition-colors"
            >
              Get Started
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 focus:outline-none focus:text-blue-900 dark:focus:text-blue-400"
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" role="navigation" aria-label="Mobile navigation">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <Link to="/" className={`block px-3 py-2 text-base font-medium ${isActive('/') ? 'text-blue-900 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>Home</Link>
            
            <div className="px-3 py-2">
              <div className="text-base font-medium text-gray-900 dark:text-white mb-2">Services</div>
              <div className="pl-4 space-y-1">
                {services.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className={`block px-3 py-2 text-sm ${isActive(service.path) ? 'text-blue-900 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-400 hover:text-blue-900 dark:hover:text-blue-400'}`}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link to="/about" className={`block px-3 py-2 text-base font-medium ${isActive('/about') ? 'text-blue-900 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>About</Link>
            <Link to="/team" className={`block px-3 py-2 text-base font-medium ${isActive('/team') ? 'text-blue-900 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>Team</Link>
            <Link to="/contact" className={`block px-3 py-2 text-base font-medium ${isActive('/contact') ? 'text-blue-900 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>Contact</Link>
            <div className="px-3 py-2 border-t">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                <Phone className="w-4 h-4" />
                <span>+1-555-BITS-2-BETTER</span>
              </div>
              <Link 
                to="/contact"
                className="block w-full bg-blue-900 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 dark:hover:bg-blue-600 transition-colors text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;