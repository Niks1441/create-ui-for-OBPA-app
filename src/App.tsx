import React, { useState } from 'react';
import Header from './components/Header';
import FiltersSection from './components/FiltersSection';
import IncentiveCurve from './components/IncentiveCurve';
import PricePointAnalysis from './components/PricePointAnalysis';
import PricePremiumization from './components/PricePremiumization';
import PromoElasticity from './components/PromoElasticity';

function App() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <FiltersSection 
          isOpen={isFiltersOpen} 
          onToggle={() => setIsFiltersOpen(!isFiltersOpen)} 
        />
        
        <div className="space-y-6">
          <IncentiveCurve />
          <PricePointAnalysis />
          <PricePremiumization />
          <PromoElasticity />
        </div>
      </div>
    </div>
  );
}

export default App;