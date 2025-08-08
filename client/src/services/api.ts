import type { Restaurant, UpdateRestaurantInput, RestaurantFilters, PaginatedResponse } from '../types/restaurant';

const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Get all restaurants
  async getRestaurants(filters?: RestaurantFilters): Promise<PaginatedResponse<Restaurant>> {
    const params = new URLSearchParams();
    if (filters?.cuisine) params.append('cuisine', filters.cuisine);
    if (filters?.location) params.append('location', filters.location);
    if (filters?.priceRange) params.append('priceRange', filters.priceRange);
    if (filters?.minRating) params.append('minRating', filters.minRating.toString());
    if (filters?.maxRating) params.append('maxRating', filters.maxRating.toString());
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const queryString = params.toString();
    const endpoint = `/restaurants${queryString ? `?${queryString}` : ''}`;
    
    return this.request<PaginatedResponse<Restaurant>>(endpoint);
  }

  // Get restaurant by ID
  async getRestaurant(id: number): Promise<Restaurant> {
    return this.request<Restaurant>(`/restaurants/${id}`);
  }



  // Update restaurant
  async updateRestaurant(id: number, data: UpdateRestaurantInput): Promise<Restaurant> {
    return this.request<Restaurant>(`/restaurants/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Delete restaurant
  async deleteRestaurant(id: number): Promise<void> {
    await this.request(`/restaurants/${id}`, {
      method: 'DELETE',
    });
  }

  // Get restaurants by cuisine
  async getRestaurantsByCuisine(cuisine: string): Promise<Restaurant[]> {
    return this.request<Restaurant[]>(`/restaurants/cuisine/${cuisine}`);
  }

  // Get restaurants by location
  async getRestaurantsByLocation(location: string): Promise<Restaurant[]> {
    return this.request<Restaurant[]>(`/restaurants/location/${location}`);
  }

  // Get top rated restaurants
  async getTopRatedRestaurants(limit: number = 5): Promise<Restaurant[]> {
    return this.request<Restaurant[]>(`/restaurants/top-rated?limit=${limit}`);
  }

  // Get restaurants by price range
  async getRestaurantsByPriceRange(priceRange: string): Promise<Restaurant[]> {
    return this.request<Restaurant[]>(`/restaurants/price/${priceRange}`);
  }

  // Get unique cuisines
  async getUniqueCuisines(): Promise<string[]> {
    return this.request<string[]>('/restaurants/cuisines');
  }

  // Get unique locations
  async getUniqueLocations(): Promise<string[]> {
    return this.request<string[]>('/restaurants/locations');
  }

  // Search restaurants
  async searchRestaurants(query: string): Promise<Restaurant[]> {
    return this.request<Restaurant[]>(`/restaurants/search?q=${encodeURIComponent(query)}`);
  }
}

export const apiService = new ApiService();
