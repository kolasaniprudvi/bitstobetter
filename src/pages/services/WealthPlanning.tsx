import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Users, Calculator, FileText, Crown, ArrowRight } from 'lucide-react';

const WealthPlanning = () => {
  const services = [
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "Wealth Accumulation Strategies",
      description: "Systematic approaches to building wealth through diversified investment strategies and tax-efficient planning."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Asset Protection",
      description: "Comprehensive strategies to protect your wealth from potential risks, litigation, and market volatility."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Multi-Generational Planning",
      description: "Estate planning and wealth transfer strategies to preserve and grow wealth across generations."
    },
    {
      icon: <Calculator className="w-8 h-8 text-blue-600" />,
      title: "Tax Optimization",
      description: "Advanced tax planning strategies to minimize tax burden and maximize after-tax returns."
    },
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Estate Planning",
      description: "Comprehensive estate planning including wills, trusts, and succession planning for business owners."
    },
    {
      icon: <Crown className="w-8 h-8 text-blue-600" />,
      title: "Legacy Planning",
      description: "Strategic planning to create lasting legacies through charitable giving and family foundations."
    }
  ];

  const wealthTiers = [
    {
      tier: "Emerging Wealth",
      range: "$100K - $1M",
      focus: "Foundation building, debt management, emergency funds",
      strategies: ["Automated investing", "Tax-advantaged accounts", "Insurance planning"]
    },
    {
      tier: "Established Wealth",
      range: "$1M - $10M",
      focus: "Growth optimization, tax efficiency, risk management",
      strategies: ["Alternative investments", "Estate planning basics", "Business succession"]
    },
    {
      tier: "Ultra High Net Worth",
      range: "$10M+",
      focus: "Preservation, legacy planning, philanthropic strategies",
      strategies: ["Family office services", "Complex trust structures", "Charitable planning"]
    }
  ];

  return (
    <main className="pt-32">
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Comprehensive Wealth Planning</h1>
            <p className="text-xl text-blue-100 dark:text-gray-300 max-w-3xl mx-auto">
              Build, preserve, and transfer wealth across generations with our comprehensive wealth planning strategies tailored to your unique financial situation and goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Strategic Wealth Management</h2>
              <p className="text-blue-100 dark:text-gray-300 mb-6">
                Our wealth planning approach goes beyond traditional investment management. We create comprehensive strategies that address every aspect of your financial life, from wealth accumulation to preservation and transfer.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3"></div>
                  <div>
                    <h3 className="font-semibold mb-1">Holistic Approach</h3>
                    <p className="text-sm text-blue-100 dark:text-gray-400">Integrated planning across all aspects of your financial life</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3"></div>
                  <div>
                    <h3 className="font-semibold mb-1">Tax Efficiency</h3>
                    <p className="text-sm text-blue-100 dark:text-gray-400">Minimize tax impact while maximizing wealth growth</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3"></div>
                  <div>
                    <h3 className="font-semibold mb-1">Legacy Focus</h3>
                    <p className="text-sm text-blue-100 dark:text-gray-400">Strategies to preserve wealth for future generations</p>
                  </div>
                </div>
              </div>
              <Link 
                to="/contact"
                className="inline-flex items-center bg-yellow-400 dark:bg-yellow-500 text-blue-900 dark:text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 dark:hover:bg-yellow-400 transition-colors group"
              >
                Start Planning Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-600/30">
              <h3 className="text-2xl font-semibold mb-6">Wealth Planning Process</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-blue-900 font-bold text-sm">1</div>
                  <span>Comprehensive Financial Assessment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-blue-900 font-bold text-sm">2</div>
                  <span>Goal Setting & Strategy Development</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-blue-900 font-bold text-sm">3</div>
                  <span>Implementation & Monitoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-blue-900 font-bold text-sm">4</div>
                  <span>Regular Review & Optimization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Wealth Planning Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive solutions for every stage of your wealth journey
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Wealth Tier Strategies</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Tailored approaches for different wealth levels
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wealthTiers.map((tier, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-transparent dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{tier.tier}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-bold mb-4">{tier.range}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{tier.focus}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Key Strategies:</h4>
                  <ul className="space-y-1">
                    {tier.strategies.map((strategy, strategyIndex) => (
                      <li key={strategyIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                        {strategy}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-900 dark:bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Wealth Strategy?</h2>
          <p className="text-xl text-blue-100 dark:text-gray-300 mb-8">
            Let our experts create a comprehensive wealth plan tailored to your unique situation.
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
              Meet Our Advisors
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WealthPlanning;