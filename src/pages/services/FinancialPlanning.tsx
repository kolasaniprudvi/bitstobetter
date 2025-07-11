import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Target, CreditCard, Shield, TrendingUp, PieChart, ArrowRight } from 'lucide-react';

const FinancialPlanning = () => {
  const services = [
    {
      icon: <Calculator className="w-8 h-8 text-blue-600" />,
      title: "Budget Analysis & Optimization",
      description: "Comprehensive budget analysis to optimize your spending and maximize savings potential."
    },
    {
      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
      title: "Debt Management",
      description: "Strategic debt consolidation and payoff plans to eliminate debt efficiently and improve credit scores."
    },
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Goal-Based Planning",
      description: "Create specific financial plans for major life goals like home purchases, education, and major expenses."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Emergency Fund Planning",
      description: "Build and maintain appropriate emergency funds to protect against unexpected financial challenges."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "Cash Flow Management",
      description: "Optimize your cash flow to ensure you have adequate liquidity while maximizing investment opportunities."
    },
    {
      icon: <PieChart className="w-8 h-8 text-blue-600" />,
      title: "Financial Health Assessment",
      description: "Regular financial health checkups to ensure you're on track to meet your financial objectives."
    }
  ];

  const planningSteps = [
    {
      step: "1",
      title: "Financial Assessment",
      description: "Comprehensive review of your current financial situation, including assets, liabilities, income, and expenses."
    },
    {
      step: "2",
      title: "Goal Setting",
      description: "Define short-term and long-term financial goals with specific timelines and target amounts."
    },
    {
      step: "3",
      title: "Strategy Development",
      description: "Create customized strategies to achieve your goals while managing risk and optimizing tax efficiency."
    },
    {
      step: "4",
      title: "Implementation",
      description: "Put your financial plan into action with specific recommendations and actionable steps."
    },
    {
      step: "5",
      title: "Monitoring & Adjustment",
      description: "Regular reviews and adjustments to keep your plan on track as your life circumstances change."
    }
  ];

  return (
    <main className="pt-32">
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Comprehensive Financial Planning</h1>
            <p className="text-xl text-blue-100 dark:text-gray-300 max-w-3xl mx-auto">
              Take control of your financial future with holistic financial planning that covers budgeting, debt management, and goal-oriented savings strategies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Your Complete Financial Roadmap</h2>
              <p className="text-blue-100 dark:text-gray-300 mb-6">
                Financial planning is more than just investing—it's about creating a comprehensive strategy that addresses every aspect of your financial life. From budgeting and debt management to goal setting and emergency planning, we help you build a solid foundation for financial success.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3"></div>
                  <div>
                    <h3 className="font-semibold mb-1">Holistic Approach</h3>
                    <p className="text-sm text-blue-100 dark:text-gray-400">Address all aspects of your financial life in one comprehensive plan</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3"></div>
                  <div>
                    <h3 className="font-semibold mb-1">Actionable Strategies</h3>
                    <p className="text-sm text-blue-100 dark:text-gray-400">Practical steps you can implement immediately</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3"></div>
                  <div>
                    <h3 className="font-semibold mb-1">Ongoing Support</h3>
                    <p className="text-sm text-blue-100 dark:text-gray-400">Regular reviews and adjustments as your life changes</p>
                  </div>
                </div>
              </div>
              <Link 
                to="/contact"
                className="inline-flex items-center bg-yellow-400 dark:bg-yellow-500 text-blue-900 dark:text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 dark:hover:bg-yellow-400 transition-colors group"
              >
                Start Your Plan
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-600/30">
              <h3 className="text-2xl font-semibold mb-6">Financial Health Score</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Emergency Fund</span>
                  <div className="flex items-center">
                    <div className="w-20 h-2 bg-gray-600 rounded-full mr-2">
                      <div className="w-16 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-green-400 font-bold">80%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Debt-to-Income</span>
                  <div className="flex items-center">
                    <div className="w-20 h-2 bg-gray-600 rounded-full mr-2">
                      <div className="w-12 h-2 bg-yellow-400 rounded-full"></div>
                    </div>
                    <span className="text-yellow-400 font-bold">60%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Savings Rate</span>
                  <div className="flex items-center">
                    <div className="w-20 h-2 bg-gray-600 rounded-full mr-2">
                      <div className="w-14 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                    <span className="text-blue-400 font-bold">70%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Investment Allocation</span>
                  <div className="flex items-center">
                    <div className="w-20 h-2 bg-gray-600 rounded-full mr-2">
                      <div className="w-18 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-green-400 font-bold">90%</span>
                  </div>
                </div>
                <hr className="border-white/20" />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Overall Score</span>
                  <span className="text-green-400">75/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Financial Planning Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive solutions for every aspect of your financial life
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Planning Process</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              A systematic approach to achieving your financial goals
            </p>
          </div>
          
          <div className="space-y-8">
            {planningSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-900 dark:bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-900 dark:bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
          <p className="text-xl text-blue-100 dark:text-gray-300 mb-8">
            Start your journey to financial freedom with a comprehensive financial plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-yellow-400 dark:bg-yellow-500 text-blue-900 dark:text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 dark:hover:bg-yellow-400 transition-colors"
            >
              Get Your Free Assessment
            </Link>
            <Link 
              to="/team"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 dark:hover:text-gray-900 transition-colors"
            >
              Meet Our Planners
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FinancialPlanning;