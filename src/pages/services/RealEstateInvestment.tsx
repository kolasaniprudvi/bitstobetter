import React from 'react';
import { Link } from 'react-router-dom';
import { Home, TrendingUp, MapPin, Calculator, Shield, Users, ArrowRight } from 'lucide-react';

const RealEstateInvestment = () => {
  const services = [
    {
      icon: <MapPin className="w-8 h-8 text-blue-600" />,
      title: "Market Analysis",
      description: "Comprehensive market research and analysis to identify the best investment opportunities in various markets."
    },
    {
      icon: <Calculator className="w-8 h-8 text-blue-600" />,
      title: "Property Evaluation",
      description: "Detailed property analysis including cash flow projections, ROI calculations, and risk assessments."
    },
    {
      icon: <Home className="w-8 h-8 text-blue-600" />,
      title: "Direct Property Investment",
      description: "Guidance on purchasing rental properties, fix-and-flip opportunities, and commercial real estate."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "REITs Management",
      description: "Strategic investment in Real Estate Investment Trusts for diversified real estate exposure."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Risk Management",
      description: "Comprehensive risk assessment and mitigation strategies for real estate investments."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Real Estate Syndications",
      description: "Access to exclusive real estate syndication opportunities for passive income generation."
    }
  ];

  const investmentTypes = [
    {
      type: "Rental Properties",
      description: "Generate passive income through residential or commercial rental properties",
      benefits: ["Monthly cash flow", "Property appreciation", "Tax advantages", "Inflation hedge"],
      riskLevel: "Medium"
    },
    {
      type: "REITs",
      description: "Invest in real estate through publicly traded Real Estate Investment Trusts",
      benefits: ["High liquidity", "Professional management", "Diversification", "Regular dividends"],
      riskLevel: "Low-Medium"
    },
    {
      type: "Real Estate Syndications",
      description: "Pool resources with other investors for larger commercial real estate deals",
      benefits: ["Access to premium properties", "Passive investment", "Professional management", "Higher returns"],
      riskLevel: "Medium-High"
    }
  ];

  return (
    <main className="pt-32">
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Real Estate Investment</h1>
            <p className="text-xl text-blue-100 dark:text-gray-300 max-w-3xl mx-auto">
              Build wealth through strategic real estate investments with expert guidance on property evaluation, market analysis, and portfolio management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Smart Real Estate Investing</h2>
              <p className="text-blue-100 dark:text-gray-300 mb-6">
                Real estate has long been a cornerstone of wealth building. Our comprehensive approach helps you navigate the complexities of real estate investment, from direct property ownership to REITs and syndications.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3"></div>
                  <div>
                    <h3 className="font-semibold mb-1">Market Expertise</h3>
                    <p className="text-sm text-blue-100 dark:text-gray-400">Deep knowledge of local and national real estate markets</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3"></div>
                  <div>
                    <h3 className="font-semibold mb-1">Diversified Strategies</h3>
                    <p className="text-sm text-blue-100 dark:text-gray-400">Multiple investment approaches to match your risk tolerance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3"></div>
                  <div>
                    <h3 className="font-semibold mb-1">Passive Income Focus</h3>
                    <p className="text-sm text-blue-100 dark:text-gray-400">Build sustainable income streams through real estate</p>
                  </div>
                </div>
              </div>
              <Link 
                to="/contact"
                className="inline-flex items-center bg-yellow-400 dark:bg-yellow-500 text-blue-900 dark:text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 dark:hover:bg-yellow-400 transition-colors group"
              >
                Explore Opportunities
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-600/30">
              <h3 className="text-2xl font-semibold mb-6">Investment Calculator</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Property Value</span>
                  <span className="text-yellow-400 font-bold">$500,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Down Payment (20%)</span>
                  <span className="text-yellow-400 font-bold">$100,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Monthly Rent</span>
                  <span className="text-yellow-400 font-bold">$3,200</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Monthly Expenses</span>
                  <span className="text-red-400 font-bold">$2,100</span>
                </div>
                <hr className="border-white/20" />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Monthly Cash Flow</span>
                  <span className="text-green-400">$1,100</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Annual ROI</span>
                  <span className="text-green-400">13.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Real Estate Investment Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive solutions for every type of real estate investor
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Investment Options</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Choose the right real estate investment strategy for your goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {investmentTypes.map((investment, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-transparent dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{investment.type}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{investment.description}</p>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {investment.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Risk Level:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    investment.riskLevel === 'Low-Medium' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    investment.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {investment.riskLevel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-900 dark:bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Wealth Through Real Estate?</h2>
          <p className="text-xl text-blue-100 dark:text-gray-300 mb-8">
            Let our real estate investment experts help you identify and capitalize on the best opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-yellow-400 dark:bg-yellow-500 text-blue-900 dark:text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 dark:hover:bg-yellow-400 transition-colors"
            >
              Schedule Consultation
            </Link>
            <Link 
              to="/team"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 dark:hover:text-gray-900 transition-colors"
            >
              Meet Our Experts
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RealEstateInvestment;