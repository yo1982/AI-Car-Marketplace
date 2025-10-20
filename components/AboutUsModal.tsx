import React, { useEffect } from 'react';

interface AboutUsModalProps {
  onClose: () => void;
}

const AboutUsModal: React.FC<AboutUsModalProps> = ({ onClose }) => {
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

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-us-heading"
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full relative animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8">
           <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close dialog">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="text-center">
            <h2 id="about-us-heading" className="text-2xl font-bold text-brand-dark mb-4">About AutoAI</h2>
          </div>
          <div className="mt-4 space-y-4 text-gray-600">
            <p>
              Welcome to AutoAI Marketplace, the future of car buying and selling. Our mission is to revolutionize the automotive industry by leveraging cutting-edge artificial intelligence to create a seamless, transparent, and personalized experience for every user.
            </p>
            <p>
              Whether you're searching for your dream car, selling your current vehicle, or looking for the right parts, our intelligent platform is designed to guide you every step of the way. We believe in empowering our customers with data-driven insights and a user-friendly interface.
            </p>
            <p className="font-semibold text-brand-dark">
              Join us on the journey to smarter car ownership.
            </p>
          </div>
           <div className="mt-8 text-center">
             <button onClick={onClose} className="w-auto bg-brand-blue text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Close
            </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsModal;
