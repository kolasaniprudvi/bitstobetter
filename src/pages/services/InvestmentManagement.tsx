import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart, TrendingUp, Shield, BarChart3, Target, Zap, ArrowRight } from 'lucide-react';

const InvestmentManagement = () => {
  const features = [
    {
      icon: <PieChart className="w-8 h-8 text-blue-600" />,
      title: "AI-Powered Portfolio Optimization",
      description: "Advanced machine learning algorithms analyze market data to optimize your portfolio allocation in real-time."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "Dynamic Risk Management",
      description: "Intelligent risk assessment and mitigation strategies that adapt to changing market conditions."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "Performance Analytics",
      description: "Comprehensive performance tracking with detailed analytics and actionable insights."
    },
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Goal-Based Investing",
      description: "Customized investment strategies aligned with your specific financial objectives and timeline."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Institutional-Grade Security",
      description: "Bank-level security protocols and regulatory compliance to protect your investments."
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Automated Rebalancing",
      description: "Smart rebalancing algorithms maintain optimal asset allocation without manual intervention."
    }
  ];

  const benefits = [
    "Reduced investment fees through AI optimization",
    "24/7 market monitoring and adjustment",
    "Tax-efficient investment strategies",
    "Diversified portfolio across multiple asset classes",
    "Real-time performance reporting",
    "Personalized investment recommendations"
  ];

  return (
    <main className="pt-32">
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Smart Portfolio Management</h1>
            <p className="text-xl text-blue-100 dark:text-gray-300 max-w-3xl mx-auto">
              Harness the power of artificial intelligence to optimize your investment portfolio with precision, reduce risk, and maximize returns through data-driven strategies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">AI-Driven Investment Excellence</h2>
              <p className="text-blue-100 dark:text-gray-300 mb-6">
                Our advanced AI algorithms process millions of data points daily to make intelligent investment decisions on your behalf. From market sentiment analysis to risk assessment, every aspect of your portfolio is optimized for maximum performance.
              </p>
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-blue-100 dark:text-gray-300">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
              <Link 
                to="/contact"
                className="inline-flex items-center bg-yellow-400 dark:bg-yellow-500 text-blue-900 dark:text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 dark:hover:bg-yellow-400 transition-colors group"
              >
                Start Optimizing Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-600/30">
              <h3 className="text-2xl font-semibold mb-6">Portfolio Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Average Annual Return</span>
                  <span className="text-yellow-400 font-bold">12.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Risk-Adjusted Return</span>
                  <span className="text-yellow-400 font-bold">1.47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Maximum Drawdown</span>
                  <span className="text-green-400 font-bold">-8.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Volatility</span>
                  <span className="text-blue-300 font-bold">11.3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Advanced Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Cutting-edge technology meets proven investment strategies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Transform Your Investments?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of investors who trust BitsToBetter with their financial future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="bg-blue-900 dark:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 dark:hover:bg-blue-600 transition-colors"
              >
                Schedule Consultation
              </Link>
              <Link 
                to="/about"
                className="border-2 border-blue-900 dark:border-blue-700 text-blue-900 dark:text-blue-400 px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 hover:text-white dark:hover:bg-blue-700 dark:hover:text-white transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InvestmentManagement;