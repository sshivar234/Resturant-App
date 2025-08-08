import React, { useState, useEffect, useCallback } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onGoHome }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (query: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setIsSearching(true);
          onSearch(query);
          // Reset searching state after a short delay
          setTimeout(() => setIsSearching(false), 300);
        }, 300); // 300ms delay
      };
    })(),
    [onSearch]
  );

  // Handle input change with real-time search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  const handleGoHome = () => {
    setSearchQuery('');
    onGoHome();
  };

  return (
    <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Title */}
          <div className="text-center md:text-left">
            <h1 
              className="text-3xl md:text-4xl font-bold mb-2 cursor-pointer hover:text-orange-200 transition-colors duration-200 select-none"
              onClick={handleGoHome}
              title="Click to go home"
            >
              🍽️ Flavor Fusion
            </h1>
            <p className="text-orange-100 text-sm md:text-base">
              Discover the best restaurants in your area
            </p>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md mx-auto md:mx-0">
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search restaurants..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-12 pr-16 text-gray-800 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-50"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  {isSearching ? (
                    <div className="animate-spin w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full"></div>
                  ) : (
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                </div>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                      title="Clear search"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              
              {/* Search hint */}
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-1 text-xs text-orange-100 bg-orange-600 bg-opacity-90 rounded px-2 py-1">
                  {isSearching ? 'Searching...' : 'Type to search restaurants'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

