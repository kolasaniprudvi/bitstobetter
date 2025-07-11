import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Contact from './pages/Contact';
import InvestmentManagement from './pages/services/InvestmentManagement';
import WealthPlanning from './pages/services/WealthPlanning';
import RetirementPlanning from './pages/services/RetirementPlanning';
import FinancialPlanning from './pages/services/FinancialPlanning';
import RealEstateInvestment from './pages/services/RealEstateInvestment';
import BusinessSolutions from './pages/services/BusinessSolutions';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/investment-management" element={<InvestmentManagement />} />
          <Route path="/services/wealth-planning" element={<WealthPlanning />} />
          <Route path="/services/retirement-planning" element={<RetirementPlanning />} />
          <Route path="/services/financial-planning" element={<FinancialPlanning />} />
          <Route path="/services/real-estate-investment" element={<RealEstateInvestment />} />
          <Route path="/services/business-solutions" element={<BusinessSolutions />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;