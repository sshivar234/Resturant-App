export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  imageUrl: string;
  location: string;
  rating: number;
  description: string | null;
  priceRange: string;
  createdAt: string;
  updatedAt: string;
}



export interface UpdateRestaurantInput {
  name?: string;
  cuisine?: string;
  imageUrl?: string;
  location?: string;
  rating?: number;
  description?: string;
  priceRange?: string;
}

export interface CreateRestaurantInput {
  name: string;
  cuisine: string;
  imageUrl: string;
  location: string;
  rating: number;
  description?: string;
  priceRange: string;
}

export interface RestaurantFilters {
  cuisine?: string;
  location?: string;
  minRating?: number;
  maxRating?: number;
  priceRange?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
