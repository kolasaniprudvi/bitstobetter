import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Calculator, TrendingUp, Clock, PiggyBank, Users, ArrowRight } from 'lucide-react';

const RetirementPlanning = () => {
  const services = [
    {
      icon: <Calculator className="w-8 h-8 text-blue-600" />,
      title: "Retirement Needs Analysis",
      description: "Comprehensive analysis to determine how much you need to save for a comfortable retirement lifestyle."
    },
    {
      icon: <PiggyBank className="w-8 h-8 text-blue-600" />,
      title: "401(k) Optimization",
      description: "Maximize your employer-sponsored retirement benefits with strategic contribution and investment strategies."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "IRA Management",
      description: "Traditional and Roth IRA strategies to optimize tax advantages and maximize retirement savings."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Social Security Optimization",
      description: "Strategic planning to maximize your Social Security benefits and optimize claiming strategies."
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Income Planning",
      description: "Create sustainable income streams for retirement through diversified investment and withdrawal strategies."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Healthcare Planning",
      description: "Plan for healthcare costs in retirement including Medicare planning and long-term care insurance."
    }
  ];

  const retirementStages = [
    {
      stage: "Early Career (20s-30s)",
      focus: "Foundation Building",
      strategies: [
        "Maximize employer 401(k) match",
        "Start Roth IRA contributions",
        "Build emergency fund",
        "Focus on growth investments"
      ]
    },
    {
      stage: "Mid Career (40s-50s)",
      focus: "Acceleration Phase",
      strategies: [
        "Increase contribution rates",
        "Catch-up contributions",
        "Diversify investment portfolio",
        "Consider Roth conversions"
      ]
    },
    {
      stage: "Pre-Retirement (55-65)",
      focus: "Preservation & Planning",
      strategies: [
        "Reduce portfolio risk",
        "Plan withdrawal strategies",
        "Optimize Social Security timing",
        "Healthcare transition planning"
      ]
    }
  ];

  return (
    <main className="pt-32">
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Retirement Planning</h1>
            <p className="text-xl text-blue-100 dark:text-gray-300 max-w-3xl mx-auto">
              Secure your financial future with comprehensive retirement planning strategies designed to help you maintain your desired lifestyle throughout your golden years.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Your Retirement, Secured</h2>
              <p className="text-blue-100 dark:text-gray-300 mb-6">
                Retirement planning isn't just about saving money—it's about creating a comprehensive strategy that ensures you can live comfortably and confidently in retirement. Our expert advisors help you navigate the complex landscape of retirement planning.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3"></div>
                  <div>
                    <h3 className="font-semibold mb-1">Personalized Strategies</h3>
                    <p className="text-sm text-blue-100 dark:text-gray-400">Tailored retirement plans based on your unique goals and timeline</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3"></div>
                  <div>
                    <h3 className="font-semibold mb-1">Tax Optimization</h3>
                    <p className="text-sm text-blue-100 dark:text-gray-400">Minimize taxes in retirement through strategic planning</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3"></div>
                  <div>
                    <h3 className="font-semibold mb-1">Income Security</h3>
                    <p className="text-sm text-blue-100 dark:text-gray-400">Create reliable income streams for your retirement years</p>
                  </div>
                </div>
              </div>
              <Link 
                to="/contact"
                className="inline-flex items-center bg-yellow-400 dark:bg-yellow-500 text-blue-900 dark:text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 dark:hover:bg-yellow-400 transition-colors group"
              >
                Plan Your Retirement
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-600/30">
              <h3 className="text-2xl font-semibold mb-6">Retirement Calculator</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Current Age</span>
                  <span className="text-yellow-400 font-bold">35</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Retirement Age</span>
                  <span className="text-yellow-400 font-bold">65</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Monthly Savings</span>
                  <span className="text-yellow-400 font-bold">$1,500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Expected Return</span>
                  <span className="text-yellow-400 font-bold">7%</span>
                </div>
                <hr className="border-white/20" />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Projected Value</span>
                  <span className="text-green-400">$1.2M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Retirement Planning Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive solutions for every aspect of your retirement
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Retirement Planning by Life Stage</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Strategic approaches for every phase of your career
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {retirementStages.map((stage, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-transparent dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{stage.stage}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-bold mb-6">{stage.focus}</p>
                <div className="space-y-3">
                  {stage.strategies.map((strategy, strategyIndex) => (
                    <div key={strategyIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{strategy}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-900 dark:bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Planning Your Retirement Today</h2>
          <p className="text-xl text-blue-100 dark:text-gray-300 mb-8">
            The earlier you start, the more comfortable your retirement will be. Let us help you create a plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-yellow-400 dark:bg-yellow-500 text-blue-900 dark:text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 dark:hover:bg-yellow-400 transition-colors"
            >
              Get Started
            </Link>
            <Link 
              to="/team"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 dark:hover:text-gray-900 transition-colors"
            >
              Meet Our Advisors
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RetirementPlanning;