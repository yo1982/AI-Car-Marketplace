import React, { useEffect } from 'react';
import { Car } from '../types';

interface CarDetailModalProps {
  car: Car;
  onClose: () => void;
}

const CarDetailModal: React.FC<CarDetailModalProps> = ({ car, onClose }) => {
  // Handle Escape key press to close the modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // SVG Icon components for better visual representation of car details
  const GasPumpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
  const TransmissionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m0-10v2m0 6v2M6 12H4m16 0h-2m-10 0h2m6 0h2" /></svg>;
  const CarTypeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 17a2 2 0 11-4 0 2 2 0 014 0zM19 17h-2.5a1.5 1.5 0 00-1.5 1.5V21m-10-4a2 2 0 11-4 0 2 2 0 014 0zM5 17H7.5a1.5 1.5 0 011.5 1.5V21m10-4H5m14-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v4m14 0l-3-3m-11 3l3-3" /></svg>;
  const CheckmarkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
  
  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="car-details-heading"
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full relative max-h-[90vh] overflow-hidden flex flex-col animate-scaleUp"
        onClick={e => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <div className="flex-shrink-0">
          <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="w-full h-64 object-cover rounded-t-xl" />
          <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black bg-opacity-40 rounded-full p-2 hover:bg-opacity-60 transition-colors" aria-label="Close dialog">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div>
              <h2 id="car-details-heading" className="text-2xl md:text-3xl font-extrabold text-brand-dark">{car.make} {car.model}</h2>
              <p className="text-lg text-gray-500">{car.year}</p>
            </div>
            <div className="mt-2 md:mt-0 text-left md:text-right">
                <p className="text-3xl font-extrabold text-brand-blue">${car.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">{car.mileage.toLocaleString()} miles</p>
            </div>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-4 grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center space-y-1">
                <GasPumpIcon/>
                <span className="font-semibold">Fuel</span>
                <span className="text-gray-600">{car.fuelType}</span>
            </div>
             <div className="flex flex-col items-center space-y-1">
                <TransmissionIcon/>
                <span className="font-semibold">Transmission</span>
                <span className="text-gray-600">{car.transmission}</span>
            </div>
             <div className="flex flex-col items-center space-y-1">
                <CarTypeIcon/>
                <span className="font-semibold">Type</span>
                <span className="text-gray-600">{car.type}</span>
            </div>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-brand-dark mb-4">Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-700">
              {car.features.map(feature => (
                <li key={feature} className="flex items-center space-x-3">
                  <CheckmarkIcon />
                  <span className="capitalize">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-shrink-0 mt-auto bg-gray-50 p-6 border-t border-gray-200">
             <button className="w-full bg-brand-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Contact Seller
            </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetailModal;