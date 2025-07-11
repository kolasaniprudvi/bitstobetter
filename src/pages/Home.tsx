import React from 'react';
import { usePageSEO } from '../hooks/useSEO';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';

const Home = () => {
  usePageSEO('home');

  return (
    <main>
      <Hero />
      <Services />
      <Testimonials />
    </main>
  );
};

export default Home;