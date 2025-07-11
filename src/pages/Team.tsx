import React from 'react';
import { usePageSEO } from '../hooks/useSEO';
import { LinkedinIcon, Mail } from 'lucide-react';

const Team = () => {
  usePageSEO('team');

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Chief Financial Officer",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "25+ years in investment banking and wealth management. CFA certified with expertise in portfolio optimization and AI-driven financial strategies.",
      specialties: ["Investment Strategy", "Risk Management", "Portfolio Optimization", "AI Finance"]
    },
    {
      name: "Michael Chen",
      role: "Senior Financial Advisor",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Former Goldman Sachs analyst with 15 years in financial planning. Specializes in retirement and estate planning with fintech innovation.",
      specialties: ["Retirement Planning", "Estate Planning", "Tax Strategy", "Digital Assets"]
    },
    {
      name: "Emily Rodriguez",
      role: "Head of AI & Data Science",
      image: "https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "PhD in Economics from Stanford. Expert in machine learning applications for financial markets and quantitative investment strategies.",
      specialties: ["Machine Learning", "Quantitative Research", "Alternative Investments", "Algorithmic Trading"]
    },
    {
      name: "David Thompson",
      role: "Wealth Manager",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "20 years in private wealth management. Specializes in high-net-worth client services and family office solutions with digital transformation.",
      specialties: ["Private Wealth", "Family Office", "Legacy Planning", "Cryptocurrency"]
    },
    {
      name: "Dr. Amanda Foster",
      role: "Chief Technology Officer",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Former Microsoft AI researcher with expertise in blockchain technology and financial systems architecture.",
      specialties: ["Blockchain", "System Architecture", "Cybersecurity", "Fintech Innovation"]
    },
    {
      name: "Robert Kim",
      role: "Director of Client Relations",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "15 years in client relationship management with a focus on digital customer experience and financial education.",
      specialties: ["Client Experience", "Financial Education", "Digital Transformation", "Customer Success"]
    }
  ];

  return (
    <main className="pt-32">
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-200" role="region" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 id="team-heading" className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Expert Team</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Meet our experienced team of financial professionals, data scientists, and technology experts dedicated to transforming your financial future through innovative AI-powered solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
            {teamMembers.map((member, index) => (
              <article key={index} className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl dark:shadow-gray-900/20 transition-all duration-200 group border border-transparent dark:border-gray-700" role="listitem">
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    width="400"
                    height="256"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors" aria-label={`Connect with ${member.name} on LinkedIn`}>
                        <LinkedinIcon className="w-4 h-4 text-white" />
                      </button>
                      <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors" aria-label={`Email ${member.name}`}>
                        <Mail className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-blue-900 dark:text-blue-400 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.map((specialty, specialtyIndex) => (
                      <span key={specialtyIndex} className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Team;