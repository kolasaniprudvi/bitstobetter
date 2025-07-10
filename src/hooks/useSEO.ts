import { useEffect } from 'react';
import { SEOData, updateMetaTags } from '../utils/seo';

export const useSEO = (seoData: Partial<SEOData>) => {
  useEffect(() => {
    updateMetaTags(seoData);
    
    // Cleanup function to restore default values if needed
    return () => {
      // Could implement cleanup logic here if needed
    };
  }, [seoData]);
};

export const usePageSEO = (pageKey: string, customData?: Partial<SEOData>) => {
  const pageSEOData = {
    home: {
      title: 'BitsToBetter - AI-Powered Fintech Solutions | Transform Your Wealth',
      description: 'Transform your wealth with AI-powered fintech solutions. Smart portfolio management, digital wealth strategies, and automated financial optimization.',
      keywords: ['fintech', 'AI finance', 'wealth management', 'investment technology']
    },
    services: {
      title: 'Fintech Services - AI Portfolio Management | BitsToBetter',
      description: 'Discover our comprehensive fintech services including AI-powered portfolio management, digital wealth strategies, and automated investment optimization.',
      keywords: ['portfolio management', 'investment services', 'wealth planning', 'fintech solutions']
    },
    about: {
      title: 'About BitsToBetter - Leading Fintech Innovation Company',
      description: 'Learn about BitsToBetter\'s 25+ years of fintech innovation, AI-powered solutions, and commitment to transforming financial data into better outcomes.',
      keywords: ['fintech company', 'financial innovation', 'AI technology', 'investment expertise']
    },
    team: {
      title: 'Expert Fintech Team - Financial Technology Leaders | BitsToBetter',
      description: 'Meet our expert team of fintech professionals, data scientists, and financial advisors dedicated to transforming your financial future.',
      keywords: ['fintech experts', 'financial advisors', 'investment team', 'technology leaders']
    },
    contact: {
      title: 'Contact BitsToBetter - Get Started with AI-Powered Finance',
      description: 'Contact BitsToBetter to start your financial transformation journey. Schedule a consultation with our fintech experts today.',
      keywords: ['contact fintech', 'financial consultation', 'investment advice', 'wealth management contact']
    }
  };
  
  const defaultData = pageSEOData[pageKey as keyof typeof pageSEOData] || pageSEOData.home;
  const finalSEOData = { ...defaultData, ...customData };
  
  useSEO(finalSEOData);
};