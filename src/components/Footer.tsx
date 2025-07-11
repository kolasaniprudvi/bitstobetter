import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, LinkedinIcon, Instagram } from 'lucide-react';

const Footer = () => {
  const services = [
    { name: 'Smart Portfolio Management', path: '/services/investment-management' },
    { name: 'Wealth Planning', path: '/services/wealth-planning' },
    { name: 'Retirement Planning', path: '/services/retirement-planning' },
    { name: 'Financial Planning', path: '/services/financial-planning' },
    { name: 'Real Estate Investment', path: '/services/real-estate-investment' },
    { name: 'Business Solutions', path: '/services/business-solutions' }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white transition-colors duration-200" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">BitsToBetter</h3>
            <p className="text-gray-400 dark:text-gray-300 mb-6">
              Your trusted partner in financial success. We provide expert guidance and innovative solutions to help you achieve your financial goals.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/bitstobetter" className="bg-gray-800 dark:bg-gray-700 p-2 rounded-full hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors" aria-label="Follow BitsToBetter on Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/bitstobetter" className="bg-gray-800 dark:bg-gray-700 p-2 rounded-full hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors" aria-label="Follow BitsToBetter on Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/bitstobetter" className="bg-gray-800 dark:bg-gray-700 p-2 rounded-full hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors" aria-label="Follow BitsToBetter on LinkedIn">
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/bitstobetter" className="bg-gray-800 dark:bg-gray-700 p-2 rounded-full hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors" aria-label="Follow BitsToBetter on Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <nav aria-label="Footer services navigation">
              <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                {services.map((service) => (
                  <li key={service.path}>
                    <Link to={service.path} className="hover:text-white dark:hover:text-gray-100 transition-colors">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <nav aria-label="Footer company navigation">
              <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                <li><Link to="/about" className="hover:text-white dark:hover:text-gray-100 transition-colors">About Us</Link></li>
                <li><Link to="/team" className="hover:text-white dark:hover:text-gray-100 transition-colors">Our Team</Link></li>
                <li><a href="#" className="hover:text-white dark:hover:text-gray-100 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white dark:hover:text-gray-100 transition-colors">News & Insights</a></li>
                <li><a href="#" className="hover:text-white dark:hover:text-gray-100 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white dark:hover:text-gray-100 transition-colors">Terms of Service</a></li>
              </ul>
            </nav>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-400 dark:text-gray-300">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>+1-555-BITS-2-BETTER</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span>info@bitstobetter.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1" />
                <address className="not-italic">456 Innovation Drive<br />San Francisco, CA 94105</address>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 dark:text-gray-300 text-sm">
              © 2024 BitsToBetter. All rights reserved.
            </p>
            <nav className="flex space-x-6 mt-4 md:mt-0" aria-label="Footer legal navigation">
              <a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 text-sm transition-colors">Cookie Policy</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;