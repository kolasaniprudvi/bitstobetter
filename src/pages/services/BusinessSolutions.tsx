import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, TrendingUp, Shield, Users, Calculator, Building, ArrowRight } from 'lucide-react';

const BusinessSolutions = () => {
  const services = [
    {
      icon: <Calculator className="w-8 h-8 text-blue-600" />,
      title: "Corporate Finance",
      description: "Strategic financial planning, capital structure optimization, and funding solutions for growing businesses."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Employee Benefits",
      description: "Comprehensive employee benefit packages including retirement plans, health insurance, and stock options."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Business Insurance",
      description: "Protect your business with comprehensive insurance solutions including liability, property, and key person coverage."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "Cash Flow Management",
      description: "Optimize working capital, manage cash flow cycles, and implement efficient payment systems."
    },
    {
      icon: <Building className="w-8 h-8 text-blue-600" />,
      title: "Business Succession Planning",
      description: "Plan for the future of your business with comprehensive succession and exit strategies."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
      title: "Executive Financial Planning",
      description: "Specialized financial planning for executives including stock options, deferred compensation, and tax strategies."
    }
  ];

  const businessStages = [
    {
      stage: "Startup",
      focus: "Foundation & Growth",
      services: [
        "Business plan financial modeling",
        "Funding strategy development",
        "Basic insurance coverage",
        "Founder financial planning"
      ]
    },
    {
      stage: "Growth",
      focus: "Scaling & Optimization",
      services: [
        "Working capital management",
        "Employee benefit programs",
        "Tax optimization strategies",
        "Risk management expansion"
      ]
    },
    {
      stage: "Mature",
      focus: "Efficiency & Succession",
      services: [
        "Advanced tax planning",
        "Succession planning",
        "Executive compensation",
        "Exit strategy development"
      ]
    }
  ];

  const industries = [
    "Technology & Software",
    "Healthcare & Biotech",
    "Manufacturing",
    "Professional Services",
    "Real Estate",
    "Retail & E-commerce"
  ];

  return (
    <main className="pt-32">
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Business Financial Solutions</h1>
            <p className="text-xl text-blue-100 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive financial solutions for businesses including corporate finance, employee benefits, and strategic planning to help your business thrive and grow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Empowering Business Success</h2>
              <p className="text-blue-100 dark:text-gray-300 mb-6">
                Running a successful business requires more than just a great product or service—it requires strategic financial planning, risk management, and employee care. Our comprehensive business solutions help you navigate every financial aspect of your business journey.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3"></div>
                  <div>
                    <h3 className="font-semibold mb-1">Strategic Planning</h3>
                    <p className="text-sm text-blue-100 dark:text-gray-400">Long-term financial strategies aligned with business goals</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3"></div>
                  <div>
                    <h3 className="font-semibold mb-1">Risk Management</h3>
                    <p className="text-sm text-blue-100 dark:text-gray-400">Comprehensive protection for your business and employees</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3"></div>
                  <div>
                    <h3 className="font-semibold mb-1">Growth Support</h3>
                    <p className="text-sm text-blue-100 dark:text-gray-400">Financial solutions that scale with your business</p>
                  </div>
                </div>
              </div>
              <Link 
                to="/contact"
                className="inline-flex items-center bg-yellow-400 dark:bg-yellow-500 text-blue-900 dark:text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 dark:hover:bg-yellow-400 transition-colors group"
              >
                Grow Your Business
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-600/30">
              <h3 className="text-2xl font-semibold mb-6">Business Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Businesses Served</span>
                  <span className="text-yellow-400 font-bold">2,500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Average Cost Savings</span>
                  <span className="text-green-400 font-bold">23%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Employee Satisfaction</span>
                  <span className="text-blue-300 font-bold">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Client Retention</span>
                  <span className="text-green-400 font-bold">97%</span>
                </div>
                <hr className="border-white/20" />
                <div className="text-center">
                  <p className="text-sm text-blue-100 dark:text-gray-300">
                    Trusted by businesses from startups to Fortune 500 companies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Business Financial Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive solutions for every aspect of your business finances
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Solutions by Business Stage</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Tailored financial strategies for every stage of business growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessStages.map((stage, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-transparent dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{stage.stage}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-bold mb-6">{stage.focus}</p>
                <div className="space-y-3">
                  {stage.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{service}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Specialized expertise across diverse industry sectors
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900 dark:text-white">{industry}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-900 dark:bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Business Finances?</h2>
          <p className="text-xl text-blue-100 dark:text-gray-300 mb-8">
            Let our business financial experts help you build a stronger, more profitable business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-yellow-400 dark:bg-yellow-500 text-blue-900 dark:text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 dark:hover:bg-yellow-400 transition-colors"
            >
              Schedule Business Consultation
            </Link>
            <Link 
              to="/team"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 dark:hover:text-gray-900 transition-colors"
            >
              Meet Our Business Advisors
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BusinessSolutions;