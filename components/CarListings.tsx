
import React from 'react';
import { Car } from '../types';
import CarCard from './CarCard';
import Button from './ui/Button';

interface CarListingsProps {
  cars: Car[] | null;
  onReset: () => void;
  isAiSearch: boolean;
  onViewDetails: (car: Car) => void;
}

const CarListings: React.FC<CarListingsProps> = ({ cars, onReset, isAiSearch, onViewDetails }) => {
  if (!cars) {
     return <div className="text-center p-10 bg-white rounded-lg shadow-md"><p className="text-gray-600">Loading cars...</p></div>;
  }
    
  if (cars.length === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-2">No Cars Found</h3>
        <p className="text-gray-600 mb-4">
          {isAiSearch ? "Our AI couldn't find a match. Try broadening your description." : "Try adjusting your filters or use our AI recommender."}
        </p>
        <Button onClick={onReset} className="w-auto px-6">Reset Search</Button>
      </div>
    );
  }
  
  return (
    <div>
        {isAiSearch && (
            <div className="mb-4 bg-blue-100 border-l-4 border-brand-blue text-blue-800 p-4 rounded-md flex justify-between items-center">
                <div>
                    <p className="font-bold">AI Recommendations</p>
                    <p>Showing cars based on your description.</p>
                </div>
                <Button onClick={onReset} variant="secondary" className="w-auto px-4 py-1 text-sm">Clear</Button>
            </div>
        )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {cars.map(car => (
          <CarCard key={car.id} car={car} onViewDetails={onViewDetails} />
        ))}
      </div>
    </div>
  );
};

export default CarListings;