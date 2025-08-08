// Render star rating
export const renderStars = (rating: number): string => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(emptyStars);
};

// Format price range
export const formatPriceRange = (priceRange: string): string => {
  // Handle new price format (e.g., "$28", "$45")
  if (priceRange.startsWith('$') && priceRange.length > 1) {
    const price = parseInt(priceRange.substring(1));
    if (price <= 20) return 'Budget';
    if (price <= 35) return 'Moderate';
    return 'Expensive';
  }
  
  // Handle old format for backward compatibility
  switch (priceRange) {
    case '$':
      return 'Budget';
    case '$$':
      return 'Moderate';
    case '$$$':
      return 'Expensive';
    default:
      return priceRange;
  }
};

// Resize Unsplash image URL for optimal card display
export const resizeImageUrl = (imageUrl: string, width: number = 800, height: number = 640): string => {
  // Force consistent Unsplash formatting for all image URLs
  if (imageUrl.includes('images.unsplash.com') || imageUrl.includes('unsplash.com/photos/')) {
    const baseUrl = imageUrl.split('?')[0];
    return `${baseUrl}?w=${width}&h=${height}&fit=crop&crop=center&auto=format&q=80`;
  }

  // If using unsplash photo URLs (non-direct), convert them
  if (imageUrl.includes('unsplash.com/photos/')) {
    const photoId = imageUrl.split('/photos/')[1]?.split(/[/?]/)[0];
    if (photoId) {
      return `https://images.unsplash.com/photo-${photoId}?w=${width}&h=${height}&fit=crop&crop=center&auto=format&q=80`;
    }
  }

  return imageUrl;
};




// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Format date
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}; 