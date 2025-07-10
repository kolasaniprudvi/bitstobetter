import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Robert Anderson",
      role: "CEO, TechCorp",
      image: "https://images.pexels.com/photos/3767392/pexels-photo-3767392.jpeg?auto=compress&cs=tinysrgb&w=400",
      content: "FinanceCore transformed our company's financial strategy. Their expertise in corporate finance helped us secure funding for expansion and optimize our cash flow. Highly recommended!",
      rating: 5
    },
    {
      name: "Lisa Martinez",
      role: "Retired Teacher",
      image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=400",
      content: "Thanks to FinanceCore's retirement planning, I was able to retire comfortably at 60. Their team guided me through every step and made complex financial concepts easy to understand.",
      rating: 5
    },
    {
      name: "James Wilson",
      role: "Small Business Owner",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      content: "The investment strategies recommended by FinanceCore have significantly grown my portfolio. Their personalized approach and regular check-ins give me confidence in my financial future.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-blue-900 dark:bg-gray-900 text-white transition-colors duration-200" role="region" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="testimonials-heading" className="text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-xl text-blue-100 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience with FinanceCore.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list">
          {testimonials.map((testimonial, index) => (
            <article key={index} className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-white/20 dark:border-gray-600/30" role="listitem">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" aria-hidden="true" />
                ))}
                <span className="sr-only">{testimonial.rating} out of 5 stars</span>
              </div>
              <Quote className="w-8 h-8 text-yellow-400 dark:text-yellow-300 mb-4" aria-hidden="true" />
              <blockquote className="text-blue-100 dark:text-gray-300 mb-6 italic">"{testimonial.content}"</blockquote>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  loading="lazy"
                  width="48"
                  height="48"
                />
                <div>
                  <cite className="font-semibold not-italic">{testimonial.name}</cite>
                  <p className="text-sm text-blue-200 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;