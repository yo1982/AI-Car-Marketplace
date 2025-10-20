import React, { useState, useMemo, useEffect } from 'react';
import { Car, FilterCriteria } from './types';
import { CARS } from './data/cars';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import AiRecommender from './components/AiRecommender';
import CarListings from './components/CarListings';
import CarDetailModal from './components/CarDetailModal';
import LoginModal from './components/LoginModal';
import AboutUsModal from './components/AboutUsModal';
import SellCarModal from './components/SellCarModal';
import PartsModal from './components/PartsModal';

const App: React.FC = () => {
  const [filters, setFilters] = useState<FilterCriteria>({
    make: '',
    model: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
  });

  const [aiRecommendations, setAiRecommendations] = useState<Car[] | null>(null);
  const [isAiSearch, setIsAiSearch] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [view, setView] = useState<'home' | 'listings'>('home');
  
  // State for all modals
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAboutUsModalOpen, setIsAboutUsModalOpen] = useState(false);
  const [isSellCarModalOpen, setIsSellCarModalOpen] = useState(false);
  const [isPartsModalOpen, setIsPartsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const handleFilterChange = (newFilters: FilterCriteria) => {
    setView('listings');
    setIsAiSearch(false);
    setAiRecommendations(null);
    setFilters(newFilters);
  };
  
  const handleAiSearch = (recommendedCars: Car[]) => {
    setView('listings');
    setIsAiSearch(true);
    setAiRecommendations(recommendedCars);
    setFilters({ make: '', model: '', minPrice: '', maxPrice: '', minYear: '' });
  };
  
  const handleResetSearch = () => {
    setIsAiSearch(false);
    setAiRecommendations(null);
    setFilters({ make: '', model: '', minPrice: '', maxPrice: '', minYear: '' });
  };

  const handleViewDetails = (car: Car) => {
    setSelectedCar(car);
  };
  
  const handleCloseDetailModal = () => {
    setSelectedCar(null);
  };

  const handleBuyCarsClick = () => {
    setView('listings');
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoHome = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Prevent body scroll when any modal or the mobile menu is open for a better user experience
    const isOverlayOpen = selectedCar || isLoginModalOpen || isAboutUsModalOpen || isSellCarModalOpen || isPartsModalOpen || isMobileMenuOpen;
    document.body.style.overflow = isOverlayOpen ? 'hidden' : 'auto';
  }, [selectedCar, isLoginModalOpen, isAboutUsModalOpen, isSellCarModalOpen, isPartsModalOpen, isMobileMenuOpen]);

  const filteredCars = useMemo(() => {
    if (isAiSearch) {
      return aiRecommendations;
    }
    
    return CARS.filter(car => {
      const { make, model, minPrice, maxPrice, minYear } = filters;
      return (
        (make ? car.make.toLowerCase() === make.toLowerCase() : true) &&
        (model ? car.model.toLowerCase().includes(model.toLowerCase()) : true) &&
        (minPrice ? car.price >= parseInt(minPrice) : true) &&
        (maxPrice ? car.price <= parseInt(maxPrice) : true) &&
        (minYear ? car.year >= parseInt(minYear) : true)
      );
    });
  }, [filters, aiRecommendations, isAiSearch]);
  
  const allMakes = useMemo(() => [...new Set(CARS.map(car => car.make))], []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-brand-dark">
      <Header 
        onLoginClick={() => setIsLoginModalOpen(true)} 
        onSellCarsClick={() => setIsSellCarModalOpen(true)}
        onPartsClick={() => setIsPartsModalOpen(true)}
        onAboutUsClick={() => setIsAboutUsModalOpen(true)}
        onBuyCarsClick={handleBuyCarsClick}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onLogoClick={handleGoHome}
      />
      <main id="main-content" className="flex-grow container mx-auto px-4 py-8 scroll-mt-24">
        {view === 'home' && (
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-2">
              Find Your Next Car
            </h1>
            <p className="text-lg text-gray-600">
              The intelligent way to buy and sell cars.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3">
            <div className="p-6 bg-white rounded-xl shadow-lg space-y-6 sticky top-8">
              <SearchBar 
                makes={allMakes}
                onFilterChange={handleFilterChange} 
                initialFilters={filters}
              />
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-sm font-medium text-gray-500">OR</span>
                </div>
              </div>
              <AiRecommender onResults={handleAiSearch} />
            </div>
          </aside>
          
          <div className="lg:col-span-9">
            <CarListings 
              cars={filteredCars} 
              onReset={handleResetSearch} 
              isAiSearch={isAiSearch} 
              onViewDetails={handleViewDetails} 
            />
          </div>
        </div>
      </main>
      <Footer />
      {selectedCar && (
        <CarDetailModal car={selectedCar} onClose={handleCloseDetailModal} />
      )}
      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
      {isAboutUsModalOpen && (
        <AboutUsModal onClose={() => setIsAboutUsModalOpen(false)} />
      )}
       {isSellCarModalOpen && (
        <SellCarModal onClose={() => setIsSellCarModalOpen(false)} />
      )}
       {isPartsModalOpen && (
        <PartsModal onClose={() => setIsPartsModalOpen(false)} />
      )}
    </div>
  );
};

export default App;