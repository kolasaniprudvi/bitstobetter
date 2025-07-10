import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import SSLIndicator from './SSLIndicator';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                <a href="#home" aria-label="BitsToBetter - Home">BitsToBetter</a>
              </h1>
            </div>
          </div>
          
          <nav className="hidden md:block" role="navigation" aria-label="Main navigation">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">Home</a>
              <a href="#services" className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">Services</a>
              <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">About</a>
              <a href="#team" className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">Team</a>
              <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">Contact</a>
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Phone className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <button className="bg-blue-900 dark:bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 dark:hover:bg-blue-600 transition-colors">
              Get Started
            </button>
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
            <a href="#home" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800">Home</a>
            <a href="#services" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800">Services</a>
            <a href="#about" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800">About</a>
            <a href="#team" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800">Team</a>
            <a href="#contact" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800">Contact</a>
            <div className="px-3 py-2 border-t">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <button className="w-full bg-blue-900 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 dark:hover:bg-blue-600 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;