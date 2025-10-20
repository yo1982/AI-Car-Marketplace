
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2">AutoAI</h3>
            <p className="text-gray-400 text-sm">The intelligent way to find your next car.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Inventory</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Sell Your Car</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Support</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Icons can be added here */}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AutoAI Marketplace. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
