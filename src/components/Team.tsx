import React from 'react';
import { LinkedinIcon, Mail } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Chief Financial Officer",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "25+ years in investment banking and wealth management. CFA certified with expertise in portfolio optimization.",
      specialties: ["Investment Strategy", "Risk Management", "Portfolio Optimization"]
    },
    {
      name: "Michael Chen",
      role: "Senior Financial Advisor",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Former Goldman Sachs analyst with 15 years in financial planning. Specializes in retirement and estate planning.",
      specialties: ["Retirement Planning", "Estate Planning", "Tax Strategy"]
    },
    {
      name: "Emily Rodriguez",
      role: "Investment Analyst",
      image: "https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "PhD in Economics from Stanford. Expert in market analysis and quantitative investment strategies.",
      specialties: ["Market Analysis", "Quantitative Research", "Alternative Investments"]
    },
    {
      name: "David Thompson",
      role: "Wealth Manager",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "20 years in private wealth management. Specializes in high-net-worth client services and family office solutions.",
      specialties: ["Private Wealth", "Family Office", "Legacy Planning"]
    }
  ];

  return (
    <section id="team" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-200" role="region" aria-labelledby="team-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="team-heading" className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Expert Team</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Meet our experienced team of financial professionals dedicated to helping you achieve your financial goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
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
                <div className="space-y-1">
                  {member.specialties.map((specialty, specialtyIndex) => (
                    <span key={specialtyIndex} className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs mr-2">
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
  );
};

export default Team;