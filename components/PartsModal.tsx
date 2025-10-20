import React, { useEffect } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';

interface PartsModalProps {
  onClose: () => void;
}

const PartsModal: React.FC<PartsModalProps> = ({ onClose }) => {
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
    alert('Our parts store is launching soon! We have noted your interest.');
    onClose();
  };

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="parts-heading"
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
            <h2 id="parts-heading" className="text-2xl font-bold text-brand-dark mb-2">Find Car Parts</h2>
            <p className="text-gray-600">Our comprehensive parts store is coming soon! Let us know what you're looking for.</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <Input label="Search for parts" id="parts-search" name="search" type="text" required placeholder="e.g. Brake pads for Toyota Camry" />
            <Button type="submit">
              Search
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PartsModal;
