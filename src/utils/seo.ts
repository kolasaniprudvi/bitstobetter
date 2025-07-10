// SEO utility functions for BitsToBetter

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export const defaultSEO: SEOData = {
  title: 'BitsToBetter - AI-Powered Fintech Solutions | Transform Your Wealth',
  description: 'Transform your wealth with BitsToBetter\'s AI-powered fintech solutions. Smart portfolio management, digital wealth strategies, and automated financial optimization for better investment outcomes.',
  keywords: [
    'fintech',
    'AI finance',
    'wealth management',
    'investment technology',
    'portfolio optimization',
    'financial planning',
    'cryptocurrency',
    'digital assets',
    'automated investing',
    'machine learning finance',
    'robo advisor',
    'financial technology'
  ],
  ogImage: 'https://bitstobetter.com/og-image.jpg',
  canonicalUrl: 'https://bitstobetter.com/'
};

export const pageSEO = {
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

export const generateStructuredData = (type: 'organization' | 'service' | 'breadcrumb', data?: any) => {
  const baseUrl = 'https://bitstobetter.com';
  
  switch (type) {
    case 'organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        name: 'BitsToBetter',
        description: 'AI-powered fintech solutions for wealth management and investment optimization',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        sameAs: [
          'https://www.linkedin.com/company/bitstobetter',
          'https://twitter.com/bitstobetter',
          'https://www.facebook.com/bitstobetter'
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: '456 Innovation Drive',
          addressLocality: 'San Francisco',
          addressRegion: 'CA',
          postalCode: '94105',
          addressCountry: 'US'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-555-BITS-2-BETTER',
          contactType: 'customer service',
          email: 'info@bitstobetter.com'
        },
        serviceType: [
          'Investment Management',
          'Wealth Planning',
          'Financial Technology',
          'Portfolio Optimization'
        ]
      };
    
    case 'service':
      return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: data?.name || 'Fintech Services',
        description: data?.description || 'AI-powered financial technology services',
        provider: {
          '@type': 'FinancialService',
          name: 'BitsToBetter'
        },
        serviceType: 'Financial Technology',
        areaServed: 'Worldwide'
      };
    
    case 'breadcrumb':
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data?.items?.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${baseUrl}${item.url}`
        })) || []
      };
    
    default:
      return {};
  }
};

export const updateMetaTags = (seoData: Partial<SEOData>) => {
  if (typeof document === 'undefined') return;
  
  // Update title
  if (seoData.title) {
    document.title = seoData.title;
  }
  
  // Update meta description
  if (seoData.description) {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seoData.description);
    }
  }
  
  // Update keywords
  if (seoData.keywords) {
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', seoData.keywords.join(', '));
    }
  }
  
  // Update canonical URL
  if (seoData.canonicalUrl) {
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', seoData.canonicalUrl);
    }
  }
};