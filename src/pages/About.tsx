import React from 'react';
import { usePageSEO } from '../hooks/useSEO';
import { Award, Users, Globe, TrendingUp } from 'lucide-react';

const About = () => {
  usePageSEO('about');

  const stats = [
    { icon: <Award className="w-8 h-8 text-yellow-400" />, value: "25+", label: "Years Experience" },
    { icon: <Users className="w-8 h-8 text-yellow-400" />, value: "15K+", label: "Satisfied Clients" },
    { icon: <Globe className="w-8 h-8 text-yellow-400" />, value: "50+", label: "Countries Served" },
    { icon: <TrendingUp className="w-8 h-8 text-yellow-400" />, value: "$2.5B+", label: "Assets Managed" }
  ];

  return (
    <main className="pt-32">
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-200" role="region" aria-labelledby="about-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 id="about-heading" className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">About BitsToBetter</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Transforming financial data into better outcomes through innovative AI-powered fintech solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                For over 25 years, BitsToBetter has been at the forefront of financial technology innovation. We combine deep industry expertise with cutting-edge AI technology to deliver personalized financial solutions that help our clients achieve their goals.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Our team of certified financial advisors and data scientists is committed to providing transparent, ethical, and results-driven financial guidance. We believe that everyone deserves access to professional financial planning, regardless of their current financial situation.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg" role="group" aria-label={`${stat.value} ${stat.label}`}>
                    <div className="flex justify-center mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-400">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-blue-900 dark:bg-gray-800 rounded-2xl p-8 text-white border border-transparent dark:border-gray-700">
                <h3 className="text-2xl font-semibold mb-6">Our Mission</h3>
                <p className="text-blue-100 dark:text-gray-300 mb-6">
                  To empower individuals and businesses to achieve financial security and prosperity through expert guidance, innovative AI solutions, and unwavering commitment to their success.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 dark:bg-yellow-300 rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Integrity First</h4>
                      <p className="text-sm text-blue-100 dark:text-gray-400">We operate with the highest ethical standards and transparency in all our dealings.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 dark:bg-yellow-300 rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Client-Centric</h4>
                      <p className="text-sm text-blue-100 dark:text-gray-400">Your financial success is our primary goal, and we tailor our services to your unique needs.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 dark:bg-yellow-300 rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Innovation</h4>
                      <p className="text-sm text-blue-100 dark:text-gray-400">We leverage cutting-edge AI technology and strategies to maximize your financial potential.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose BitsToBetter?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We're not just another fintech company. We're your partners in financial transformation.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-900 dark:bg-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Proven Expertise</h3>
                <p className="text-gray-600 dark:text-gray-300">25+ years of experience in financial markets and technology innovation.</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-900 dark:bg-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Solutions</h3>
                <p className="text-gray-600 dark:text-gray-300">Cutting-edge artificial intelligence to optimize your investment strategies.</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-900 dark:bg-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Personalized Service</h3>
                <p className="text-gray-600 dark:text-gray-300">Dedicated advisors who understand your unique financial goals and challenges.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;