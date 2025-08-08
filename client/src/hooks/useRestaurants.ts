import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';
import type { Restaurant, UpdateRestaurantInput, CreateRestaurantInput, RestaurantFilters, PaginatedResponse } from '../types/restaurant';

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<Restaurant>['pagination'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<RestaurantFilters>({});

  // Fetch restaurants
  const fetchRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.getRestaurants(filters);
      setRestaurants(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch restaurants');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Load restaurants on mount and when filters change
  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);



  // Update restaurant
  const updateRestaurant = async (id: number, data: UpdateRestaurantInput) => {
    try {
      const updatedRestaurant = await apiService.updateRestaurant(id, data);
      setRestaurants(prev => 
        prev.map(restaurant => 
          restaurant.id === id ? updatedRestaurant : restaurant
        )
      );
      return updatedRestaurant;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update restaurant');
      throw err;
    }
  };

  // Delete restaurant
  const deleteRestaurant = async (id: number) => {
    try {
      await apiService.deleteRestaurant(id);
      setRestaurants(prev => prev.filter(restaurant => restaurant.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete restaurant');
      throw err;
    }
  };

  // Create restaurant
  const createRestaurant = async (data: CreateRestaurantInput) => {
    try {
      const newRestaurant = await apiService.createRestaurant(data);
      setRestaurants(prev => [newRestaurant, ...prev]); // Add to beginning of list
      return newRestaurant;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create restaurant');
      throw err;
    }
  };

  // Search restaurants
  const searchRestaurants = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      
      if (query.trim() === '') {
        // If search is empty, fetch all restaurants with current filters
        const result = await apiService.getRestaurants(filters);
        setRestaurants(result.data);
        setPagination(result.pagination);
      } else {
        // Perform search
        const data = await apiService.searchRestaurants(query);
        setRestaurants(data);
        setPagination(null); // Search results don't have pagination
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search restaurants');
    } finally {
      setLoading(false);
    }
  };

  // Get unique cuisines
  const [cuisines, setCuisines] = useState<string[]>([]);
  const fetchCuisines = useCallback(async () => {
    try {
      const data = await apiService.getUniqueCuisines();
      setCuisines(data);
    } catch (err) {
      console.error('Failed to fetch cuisines:', err);
    }
  }, []);

  // Get unique locations
  const [locations, setLocations] = useState<string[]>([]);
  const fetchLocations = useCallback(async () => {
    try {
      const data = await apiService.getUniqueLocations();
      setLocations(data);
    } catch (err) {
      console.error('Failed to fetch locations:', err);
    }
  }, []);

  // Load cuisines and locations on mount
  useEffect(() => {
    fetchCuisines();
    fetchLocations();
  }, [fetchCuisines, fetchLocations]);

  return {
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
    clearError: () => setError(null),
  };
};
