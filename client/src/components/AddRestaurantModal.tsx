import React, { useState } from 'react';
import type { CreateRestaurantInput } from '../types/restaurant';

interface AddRestaurantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateRestaurantInput) => Promise<void>;
  cuisines: string[];
  locations: string[];
}

export const AddRestaurantModal: React.FC<AddRestaurantModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  cuisines,
  locations,
}) => {
  const [formData, setFormData] = useState<CreateRestaurantInput>({
    name: '',
    cuisine: '',
    imageUrl: '',
    location: '',
    rating: 4,
    description: '',
    priceRange: '',
  });

  const [errors, setErrors] = useState<Partial<CreateRestaurantInput>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateRestaurantInput> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Restaurant name is required';
    }

    if (!formData.cuisine) {
      newErrors.cuisine = 'Cuisine is required';
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }

    if (!formData.location) {
      newErrors.location = 'Location is required';
    }

    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5';
    }

    if (!formData.priceRange) {
      newErrors.priceRange = 'Price range is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      handleClose();
    } catch (error) {
      console.error('Failed to create restaurant:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      cuisine: '',
      imageUrl: '',
      location: '',
      rating: 4,
      description: '',
      priceRange: '',
    });
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  const handleInputChange = (field: keyof CreateRestaurantInput, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add New Restaurant</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Restaurant Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Restaurant Name *
              </label>
                             <input
                 type="text"
                 id="name"
                 value={formData.name}
                 onChange={(e) => handleInputChange('name', e.target.value)}
                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 ${
                   errors.name ? 'border-red-500' : 'border-gray-200'
                 }`}
                 placeholder="Enter restaurant name"
               />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Cuisine */}
            <div>
              <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-2">
                Cuisine *
              </label>
                             <select
                 id="cuisine"
                 value={formData.cuisine}
                 onChange={(e) => handleInputChange('cuisine', e.target.value)}
                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 ${
                   errors.cuisine ? 'border-red-500' : 'border-gray-200'
                 }`}
               >
                <option value="">Select cuisine</option>
                {cuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
              {errors.cuisine && <p className="mt-1 text-sm text-red-600">{errors.cuisine}</p>}
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
                             <select
                 id="location"
                 value={formData.location}
                 onChange={(e) => handleInputChange('location', e.target.value)}
                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 ${
                   errors.location ? 'border-red-500' : 'border-gray-200'
                 }`}
               >
                <option value="">Select location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
                             <input
                 type="url"
                 id="imageUrl"
                 value={formData.imageUrl}
                 onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 ${
                   errors.imageUrl ? 'border-red-500' : 'border-gray-200'
                 }`}
                 placeholder="https://images.unsplash.com/photo-..."
               />
              {errors.imageUrl && <p className="mt-1 text-sm text-red-600">{errors.imageUrl}</p>}
              <p className="mt-1 text-xs text-gray-500">
                Enter a valid Unsplash image URL (e.g., https://images.unsplash.com/photo-...)
              </p>
            </div>

            {/* Rating */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                Rating *
              </label>
                             <select
                 id="rating"
                 value={formData.rating}
                 onChange={(e) => handleInputChange('rating', parseInt(e.target.value))}
                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 ${
                   errors.rating ? 'border-red-500' : 'border-gray-200'
                 }`}
               >
                <option value={1}>1 Star</option>
                <option value={2}>2 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={5}>5 Stars</option>
              </select>
              {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating}</p>}
            </div>

            {/* Price Range */}
            <div>
              <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-2">
                Price Range *
              </label>
                             <select
                 id="priceRange"
                 value={formData.priceRange}
                 onChange={(e) => handleInputChange('priceRange', e.target.value)}
                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 ${
                   errors.priceRange ? 'border-red-500' : 'border-gray-200'
                 }`}
               >
                <option value="">Select price range</option>
                <option value="$15">$15 - Budget</option>
                <option value="$18">$18 - Budget</option>
                <option value="$22">$22 - Moderate</option>
                <option value="$25">$25 - Moderate</option>
                <option value="$28">$28 - Moderate</option>
                <option value="$32">$32 - Moderate</option>
                <option value="$35">$35 - Moderate</option>
                <option value="$38">$38 - Expensive</option>
                <option value="$42">$42 - Expensive</option>
                <option value="$45">$45 - Expensive</option>
                <option value="$48">$48 - Expensive</option>
                <option value="$52">$52 - Expensive</option>
                <option value="$55">$55 - Expensive</option>
                <option value="$58">$58 - Expensive</option>
              </select>
              {errors.priceRange && <p className="mt-1 text-sm text-red-600">{errors.priceRange}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
                             <textarea
                 id="description"
                 value={formData.description}
                 onChange={(e) => handleInputChange('description', e.target.value)}
                 rows={3}
                 className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                 placeholder="Enter restaurant description..."
               />
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                             <button
                 type="button"
                 onClick={handleClose}
                 className="px-4 py-2 text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
                 disabled={isSubmitting}
               >
                 Cancel
               </button>
                             <button
                 type="submit"
                 disabled={isSubmitting}
                 className="px-6 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-sm"
               >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Creating...</span>
                  </>
                ) : (
                  <span>Create Restaurant</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
