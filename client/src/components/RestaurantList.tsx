import React from 'react';
import { RestaurantCard } from './RestaurantCard';
import type { Restaurant } from '../types/restaurant';

interface RestaurantListProps {
  restaurants: Restaurant[];
  onEdit: (id: number, data: { name?: string; cuisine?: string; location?: string; rating?: number; priceRange?: string }) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

export const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  onEdit,
  onDelete,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No restaurants found</div>
        <p className="text-gray-400">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
