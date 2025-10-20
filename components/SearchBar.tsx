
import React, { useState, useEffect } from 'react';
import { FilterCriteria } from '../types';
import Input from './ui/Input';

interface SearchBarProps {
  makes: string[];
  onFilterChange: (filters: FilterCriteria) => void;
  initialFilters: FilterCriteria;
}

const SearchBar: React.FC<SearchBarProps> = ({ makes, onFilterChange, initialFilters }) => {
  const [filters, setFilters] = useState<FilterCriteria>(initialFilters);

  useEffect(() => {
    // Sync with parent state if initial filters change (e.g., reset)
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };
  
  const handleReset = () => {
     const resetFilters = { make: '', model: '', minPrice: '', maxPrice: '', minYear: '' };
     setFilters(resetFilters);
     onFilterChange(resetFilters);
  };

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <h3 className="text-xl font-bold text-brand-dark">Filter Cars</h3>
      <div>
        <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">Make</label>
        <select
          id="make"
          name="make"
          value={filters.make}
          onChange={handleChange}
          className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
        >
          <option value="">All Makes</option>
          {makes.map(make => (
            <option key={make} value={make}>{make}</option>
          ))}
        </select>
      </div>
      <Input label="Model" id="model" name="model" type="text" value={filters.model} onChange={handleChange} placeholder="e.g. Camry" />
      <div className="grid grid-cols-2 gap-2">
        <Input label="Min Price" id="minPrice" name="minPrice" type="number" value={filters.minPrice} onChange={handleChange} placeholder="e.g. 15000" />
        <Input label="Max Price" id="maxPrice" name="maxPrice" type="number" value={filters.maxPrice} onChange={handleChange} placeholder="e.g. 30000" />
      </div>
      <Input label="Min Year" id="minYear" name="minYear" type="number" value={filters.minYear} onChange={handleChange} placeholder="e.g. 2020" />
      <div className="flex flex-col space-y-2 pt-2">
         <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Search
         </button>
         <button type="button" onClick={handleReset} className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Reset
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
