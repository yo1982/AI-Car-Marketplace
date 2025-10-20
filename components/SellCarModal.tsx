import React, { useEffect } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';

interface SellCarModalProps {
  onClose: () => void;
}

const SellCarModal: React.FC<SellCarModalProps> = ({ onClose }) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit data
    alert('Thank you! Our team will review your inquiry and get back to you shortly.');
    onClose();
  };

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sell-car-heading"
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-md w-full relative animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8">
           <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close dialog">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="text-center">
            <h2 id="sell-car-heading" className="text-2xl font-bold text-brand-dark mb-2">Sell Your Car With Us</h2>
            <p className="text-gray-600">Fill out the details below to get started.</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <Input label="Car Make" id="sell-make" name="make" type="text" required placeholder="e.g. Toyota" />
            <Input label="Car Model" id="sell-model" name="model" type="text" required placeholder="e.g. Camry" />
            <Input label="Year" id="sell-year" name="year" type="number" required placeholder="e.g. 2022" />
            <Input label="Contact Email" id="sell-email" name="email" type="email" required placeholder="you@example.com" />
            <Button type="submit">
              Submit Inquiry
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellCarModal;
