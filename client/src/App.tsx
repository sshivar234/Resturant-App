import React, { useState } from 'react';
import { Header } from './components/Header';
import { Filter } from './components/Filter';
import { RestaurantList } from './components/RestaurantList';
import { Pagination } from './components/Pagination';
import { AddRestaurantModal } from './components/AddRestaurantModal';
import { useRestaurants } from './hooks/useRestaurants';

function App() {
  const {
    restaurants,
    pagination,
    loading,
    error,
    filters,
    cuisines,
    locations,
    setFilters,
    updateRestaurant,
    deleteRestaurant,
    createRestaurant,
    searchRestaurants,
    fetchRestaurants,
    clearError,
  } = useRestaurants();

  const [isSearching, setIsSearching] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      setIsSearching(true);
      await searchRestaurants(query);
    } else {
      setIsSearching(false);
      await fetchRestaurants();
    }
  };

  const handleEdit = async (id: number, data: { name?: string; cuisine?: string; location?: string; rating?: number; priceRange?: string }) => {
    try {
      await updateRestaurant(id, data);
    } catch (err) {
      console.error('Failed to update restaurant:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteRestaurant(id);
    } catch (err) {
      console.error('Failed to delete restaurant:', err);
    }
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleGoHome = async () => {
    // Clear all filters and search
    setFilters({});
    setIsSearching(false);
    await fetchRestaurants();
  };

  const handlePageChange = async (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleCreateRestaurant = async (data: any) => {
    try {
      await createRestaurant(data);
    } catch (err) {
      console.error('Failed to create restaurant:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} onGoHome={handleGoHome} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Error message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-800">{error}</span>
              </div>
              <button
                onClick={clearError}
                className="text-red-400 hover:text-red-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <Filter
          filters={filters}
          onFilterChange={handleFilterChange}
          cuisines={cuisines}
          locations={locations}
        />

        {/* Results count and Add button */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {isSearching ? 'Search Results' : 'All Restaurants'}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {loading ? 'Loading...' : pagination 
                  ? `${pagination.totalItems} restaurant${pagination.totalItems !== 1 ? 's' : ''} (Page ${pagination.currentPage} of ${pagination.totalPages})`
                  : `${restaurants.length} restaurant${restaurants.length !== 1 ? 's' : ''}`
                }
              </span>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Restaurant</span>
              </button>
            </div>
          </div>
        </div>

        {/* Restaurant list */}
        <RestaurantList
          restaurants={restaurants}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />

        {/* Pagination */}
        {pagination && !isSearching && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            hasNextPage={pagination.hasNextPage}
            hasPreviousPage={pagination.hasPreviousPage}
          />
        )}

        {/* Add Restaurant Modal */}
        <AddRestaurantModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleCreateRestaurant}
          cuisines={cuisines}
          locations={locations}
        />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            © 2024 Flavor Fusion. Discover amazing restaurants near you.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
