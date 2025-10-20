import React from 'react';
import Button from './ui/Button';

interface HeaderProps {
  onLoginClick: () => void;
  onSellCarsClick: () => void;
  onPartsClick: () => void;
  onAboutUsClick: () => void;
  onBuyCarsClick: () => void;
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
  onLogoClick: () => void;
}

const CarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 17H5a2 2 0 00-2 2v-4a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 00-2-2zM5 17l-3-3m17 3l3-3M5 10V7a2 2 0 012-2h10a2 2 0 012 2v3" />
  </svg>
);

const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);


const Header: React.FC<HeaderProps> = ({ 
  onLoginClick, 
  onSellCarsClick, 
  onPartsClick, 
  onAboutUsClick,
  onBuyCarsClick,
  isMobileMenuOpen,
  onMobileMenuToggle,
  onLogoClick
}) => {
  const handleMobileLinkClick = (action: () => void) => {
    onMobileMenuToggle(); // Close menu first
    action(); // Then trigger the action
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <button onClick={onLogoClick} className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue rounded-md p-1 -ml-1">
            <CarIcon className="text-brand-blue" />
            <span className="text-2xl font-bold text-brand-dark">Auto<span className="text-brand-blue">AI</span></span>
          </button>
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={onBuyCarsClick} className="text-gray-600 hover:text-brand-blue transition-colors">Buy Cars</button>
            <button onClick={onSellCarsClick} className="text-gray-600 hover:text-brand-blue transition-colors">Sell Cars</button>
            <button onClick={onPartsClick} className="text-gray-600 hover:text-brand-blue transition-colors">Parts</button>
            <button onClick={onAboutUsClick} className="text-gray-600 hover:text-brand-blue transition-colors">About Us</button>
          </nav>
          <div className="hidden md:flex">
            <Button className="w-auto px-6" onClick={onLoginClick}>Login</Button>
          </div>
          <div className="md:hidden">
            <button onClick={onMobileMenuToggle} aria-label="Open menu" className="text-gray-600 hover:text-brand-blue">
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
       <div 
        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onMobileMenuToggle}
        aria-hidden="true"
      />
      <div className={`md:hidden fixed top-0 right-0 bottom-0 bg-white z-50 w-4/5 max-w-sm shadow-xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className="flex justify-between items-center p-4 border-b">
              <span className="text-xl font-bold text-brand-dark">Menu</span>
             <button onClick={onMobileMenuToggle} aria-label="Close menu" className="text-gray-600 hover:text-brand-blue">
               <CloseIcon />
             </button>
           </div>
           <nav className="flex flex-col items-center justify-center h-full -mt-16">
              <ul className="flex flex-col items-center space-y-8 text-xl">
                <li><button onClick={() => handleMobileLinkClick(onBuyCarsClick)} className="text-gray-700 hover:text-brand-blue">Buy Cars</button></li>
                <li><button onClick={() => handleMobileLinkClick(onSellCarsClick)} className="text-gray-700 hover:text-brand-blue">Sell Cars</button></li>
                <li><button onClick={() => handleMobileLinkClick(onPartsClick)} className="text-gray-700 hover:text-brand-blue">Parts</button></li>
                <li><button onClick={() => handleMobileLinkClick(onAboutUsClick)} className="text-gray-700 hover:text-brand-blue">About Us</button></li>
              </ul>
              <div className="mt-12 w-3/4 max-w-sm">
                <Button className="w-full" onClick={() => handleMobileLinkClick(onLoginClick)}>Login</Button>
              </div>
           </nav>
        </div>
    </header>
  );
};

export default Header;