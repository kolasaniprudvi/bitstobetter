import React from 'react';
import { PieChart, TrendingUp, Shield, CreditCard, Home, Briefcase } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <PieChart className="w-12 h-12 text-blue-900" />,
      title: "Smart Portfolio Management", 
      description: "Diversified portfolio management with risk-adjusted returns tailored to your financial goals and risk tolerance.",
      features: ["Portfolio Diversification", "Risk Assessment", "Regular Rebalancing"]
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-blue-900" />,
      title: "Wealth Planning",
      description: "Comprehensive wealth planning strategies to help you build, preserve, and transfer wealth across generations.",
      features: ["Estate Planning", "Tax Optimization", "Legacy Planning"]
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-900" />,
      title: "Retirement Planning",
      description: "Strategic retirement planning to ensure you maintain your desired lifestyle throughout your golden years.",
      features: ["401(k) Management", "IRA Optimization", "Income Planning"]
    },
    {
      icon: <CreditCard className="w-12 h-12 text-blue-900" />,
      title: "Financial Planning",
      description: "Holistic financial planning covering budgeting, debt management, and goal-oriented savings strategies.",
      features: ["Budget Analysis", "Debt Consolidation", "Goal Setting"]
    },
    {
      icon: <Home className="w-12 h-12 text-blue-900" />,
      title: "Real Estate Investment",
      description: "Expert guidance on real estate investment opportunities and property portfolio management.",
      features: ["Market Analysis", "Property Evaluation", "REITs Management"]
    },
    {
      icon: <Briefcase className="w-12 h-12 text-blue-900" />,
      title: "Business Solutions",
      description: "Comprehensive financial solutions for businesses including corporate finance and employee benefits.",
      features: ["Corporate Finance", "Employee Benefits", "Business Insurance"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-200" role="region" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="services-heading" className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive financial services designed to meet your unique needs and help you achieve your financial aspirations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {services.map((service, index) => (
            <article key={index} className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl dark:shadow-gray-900/20 transition-all duration-200 group border border-transparent dark:border-gray-700" role="listitem">
              <div className="mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-2 h-2 bg-blue-900 dark:bg-blue-400 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 text-blue-900 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors" aria-label={`Learn more about ${service.title}`}>
                Learn More →
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;