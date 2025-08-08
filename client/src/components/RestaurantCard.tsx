import React, { useState } from 'react';
import type { Restaurant } from '../types/restaurant';
import { renderStars, formatPriceRange, truncateText, resizeImageUrl } from '../utils/helpers';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onEdit: (id: number, data: { name?: string; cuisine?: string; location?: string; rating?: number; priceRange?: string }) => void;
  onDelete: (id: number) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onEdit,
  onDelete,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: restaurant.name,
    cuisine: restaurant.cuisine,
    location: restaurant.location,
    rating: restaurant.rating,
    priceRange: restaurant.priceRange
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    // Only send fields that have actually changed
    const changedData: any = {};
    
    if (editData.name !== restaurant.name) changedData.name = editData.name;
    if (editData.cuisine !== restaurant.cuisine) changedData.cuisine = editData.cuisine;
    if (editData.location !== restaurant.location) changedData.location = editData.location;
    if (editData.rating !== restaurant.rating) changedData.rating = editData.rating;
    if (editData.priceRange !== restaurant.priceRange) changedData.priceRange = editData.priceRange;
    
    // Only call onEdit if there are actual changes
    if (Object.keys(changedData).length > 0) {
      onEdit(restaurant.id, changedData);
    }
    
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditData({
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      location: restaurant.location,
      rating: restaurant.rating,
      priceRange: restaurant.priceRange
    });
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(restaurant.id);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div
        className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {/* Action buttons overlay */}
        {showActions && (
          <div className="absolute top-2 right-2 z-10 flex gap-2">
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
              title="Edit restaurant"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={handleDeleteClick}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
              title="Delete restaurant"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}

                 {/* Restaurant image */}
         <div className="relative h-48 overflow-hidden bg-gray-100">
           <img
             src={resizeImageUrl(restaurant.imageUrl)}
             alt={restaurant.name}
             className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
             onError={(e) => {
               const target = e.target as HTMLImageElement;
               target.style.display = 'none';
             }}
             loading="lazy"
             style={{
               minHeight: '192px', // 48 * 4 = 192px (h-48)
               objectFit: 'cover',
               objectPosition: 'center'
             }}
           />
           <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
             {formatPriceRange(restaurant.priceRange)}
           </div>
         </div>

         {/* Price display below image */}
         <div className="px-4 py-2 bg-orange-50 border-b border-orange-100">
           <div className="flex items-center justify-between">
             <span className="text-sm font-medium text-orange-700">
               Price Range:
             </span>
             <span className="text-lg font-bold text-orange-600">
               {restaurant.priceRange}
             </span>
           </div>
         </div>

        {/* Restaurant info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {restaurant.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {restaurant.cuisine} • {restaurant.location}
          </p>
          
          {/* Rating section */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500 text-lg">{renderStars(restaurant.rating)}</span>
              <span className="text-sm text-gray-600 ml-1">({restaurant.rating})</span>
            </div>
          </div>

          {/* Description */}
          {restaurant.description && (
            <p className="text-sm text-gray-700 mb-3">
              {truncateText(restaurant.description, 80)}
            </p>
          )}

          {/* Edit restaurant form */}
          {isEditing && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Edit Restaurant</h4>
              
              {/* Name */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="w-full border border-gray-200 rounded px-2 py-1 text-sm bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                />
              </div>

              {/* Cuisine */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine:</label>
                <input
                  type="text"
                  value={editData.cuisine}
                  onChange={(e) => setEditData({...editData, cuisine: e.target.value})}
                  className="w-full border border-gray-200 rounded px-2 py-1 text-sm bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                />
              </div>

              {/* Location */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location:</label>
                <input
                  type="text"
                  value={editData.location}
                  onChange={(e) => setEditData({...editData, location: e.target.value})}
                  className="w-full border border-gray-200 rounded px-2 py-1 text-sm bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                />
              </div>

              {/* Price Range */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range:</label>
                <input
                  type="text"
                  value={editData.priceRange}
                  onChange={(e) => setEditData({...editData, priceRange: e.target.value})}
                  placeholder="$25 or $, $$, $$$"
                  className="w-full border border-gray-200 rounded px-2 py-1 text-sm bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                />
              </div>

              {/* Rating */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating:</label>
                <select
                  value={editData.rating}
                  onChange={(e) => setEditData({...editData, rating: Number(e.target.value)})}
                  className="w-full border border-gray-200 rounded px-2 py-1 text-sm bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} {rating === 1 ? 'star' : 'stars'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Delete Restaurant
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{restaurant.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
