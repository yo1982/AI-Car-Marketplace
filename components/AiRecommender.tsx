
import React, { useState } from 'react';
import { getAiCarSuggestions } from '../services/geminiService';
import Button from './ui/Button';
import { Car, AiFilterCriteria } from '../types';
import { CARS } from '../data/cars';

interface AiRecommenderProps {
  onResults: (recommendedCars: Car[]) => void;
}

const AiRecommender: React.FC<AiRecommenderProps> = ({ onResults }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const examplePrompts = [
      "A safe family SUV under $30,000 with good fuel economy.",
      "A luxury sedan from 2021 or newer.",
      "An off-road truck that's great for adventures."
  ];

  const handlePromptClick = (example: string) => {
      setPrompt(example);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Please describe the car you're looking for.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const criteria = await getAiCarSuggestions(prompt);
      const recommendedCars = filterCarsByAi(criteria);
      onResults(recommendedCars);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const filterCarsByAi = (criteria: AiFilterCriteria): Car[] => {
      return CARS.filter(car => {
          if (criteria.type && car.type.toLowerCase() !== criteria.type.toLowerCase()) return false;
          if (criteria.make && car.make.toLowerCase() !== criteria.make.toLowerCase()) return false;
          if (criteria.minPrice && car.price < criteria.minPrice) return false;
          if (criteria.maxPrice && car.price > criteria.maxPrice) return false;
          if (criteria.minYear && car.year < criteria.minYear) return false;
          if (criteria.features && criteria.features.length > 0) {
              if (!criteria.features.every(feature => car.features.includes(feature))) {
                  return false;
              }
          }
          return true;
      });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-brand-dark flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        AI Recommender
      </h3>
      <p className="text-sm text-gray-600">
        Describe your perfect car, and our AI will find it for you.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'I need a safe family SUV...'"
          className="w-full h-24 p-2 border border-gray-300 rounded-md focus:ring-brand-blue focus:border-brand-blue"
          disabled={isLoading}
        />
        <div className="text-xs text-gray-500">
            Try an example:
            <ul className="mt-1 space-y-1">
                {examplePrompts.map((p, i) => (
                     <li key={i}><button type="button" onClick={() => handlePromptClick(p)} className="text-left text-blue-600 hover:underline">{p}</button></li>
                ))}
            </ul>
        </div>
        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
          {isLoading ? 'Thinking...' : 'Find My Car'}
        </Button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default AiRecommender;
