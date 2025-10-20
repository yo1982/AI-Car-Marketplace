
import React from 'react';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
  onViewDetails: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <img className="w-full h-56 object-cover" src={car.imageUrl} alt={`${car.make} ${car.model}`} />
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-brand-dark">{car.make} {car.model}</h3>
        <p className="text-gray-500">{car.year}</p>
        <div className="mt-4 mb-4 flex-grow">
          <p className="text-2xl font-extrabold text-brand-blue">
            ${car.price.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {car.mileage.toLocaleString()} miles
          </p>
        </div>
        <div className="border-t border-gray-200 pt-4 text-sm text-gray-600 grid grid-cols-2 gap-2">
            <span><strong className="font-semibold">Fuel:</strong> {car.fuelType}</span>
            <span><strong className="font-semibold">Trans:</strong> {car.transmission}</span>
        </div>
      </div>
       <div className="bg-gray-50 px-6 py-3">
            <button 
                onClick={() => onViewDetails(car)}
                className="w-full bg-brand-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
                View Details
            </button>
        </div>
    </div>
  );
};

export default CarCard;