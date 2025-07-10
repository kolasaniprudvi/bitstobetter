import React from 'react';
import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 text-white pt-32" role="main" aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Secure Your Financial 
              <span className="text-yellow-400"> Future</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Expert financial guidance, innovative investment strategies, and personalized wealth management solutions to help you achieve your financial goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-yellow-400 dark:bg-yellow-500 text-blue-900 dark:text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 dark:hover:bg-yellow-400 transition-colors flex items-center justify-center group" aria-label="Start your financial transformation journey">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 dark:hover:text-gray-900 transition-colors" aria-label="Schedule a consultation">
                Schedule Consultation
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8" role="region" aria-label="Company statistics">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 dark:text-yellow-300">$2.5B+</div>
                <div className="text-sm text-blue-200 dark:text-gray-300">Assets Managed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 dark:text-yellow-300">15K+</div>
                <div className="text-sm text-blue-200 dark:text-gray-300">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 dark:text-yellow-300">25+</div>
                <div className="text-sm text-blue-200 dark:text-gray-300">Years Experience</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-600/30">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/20 dark:bg-gray-700/40 rounded-xl p-6 text-center">
                  <Shield className="w-12 h-12 text-yellow-400 dark:text-yellow-300 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Secure</h3>
                  <p className="text-sm text-blue-100 dark:text-gray-300">Bank-level security for your investments</p>
                </div>
                <div className="bg-white/20 dark:bg-gray-700/40 rounded-xl p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-yellow-400 dark:text-yellow-300 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Growth</h3>
                  <p className="text-sm text-blue-100 dark:text-gray-300">Proven strategies for wealth building</p>
                </div>
                <div className="bg-white/20 dark:bg-gray-700/40 rounded-xl p-6 text-center col-span-2">
                  <Users className="w-12 h-12 text-yellow-400 dark:text-yellow-300 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Personalized Service</h3>
                  <p className="text-sm text-blue-100 dark:text-gray-300">Dedicated advisors for your unique financial journey</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;