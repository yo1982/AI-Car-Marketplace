import React, { useEffect } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
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
        aria-labelledby="login-heading"
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
            <h2 id="login-heading" className="text-2xl font-bold text-brand-dark mb-2">Welcome Back!</h2>
            <p className="text-gray-600">Sign in to continue to AutoAI.</p>
          </div>
          <form className="mt-8 space-y-6">
            <Input label="Email Address" id="email" name="email" type="email" required placeholder="you@example.com" />
            <Input label="Password" id="password" name="password" type="password" required placeholder="••••••••" />
            <div className="flex items-center justify-between text-sm">
                <a href="#" className="font-medium text-brand-blue hover:text-blue-700">Forgot password?</a>
            </div>
            <Button type="submit">
              Sign In
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Not a member? <a href="#" className="font-medium text-brand-blue hover:text-blue-700">Start your journey here!</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
