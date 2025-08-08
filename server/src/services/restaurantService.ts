import { PrismaClient } from '@prisma/client';
import { 
  Restaurant, 
  UpdateRestaurantInput, 
  RestaurantFilters,
  PaginatedResponse
} from '../types/restaurant';

const prisma = new PrismaClient();

export class RestaurantService {
  // Get all restaurants with optional filters and pagination
  async getAllRestaurants(filters?: RestaurantFilters): Promise<PaginatedResponse<Restaurant>> {
    const where: any = {};

    if (filters?.cuisine) {
      where.cuisine = filters.cuisine;
    }

    if (filters?.location) {
      where.location = filters.location;
    }

    if (filters?.priceRange) {
      // Convert price range filter to dynamic price ranges
      switch (filters.priceRange) {
        case '$': // Budget: < $20
          where.priceRange = {
            in: await this.getPriceRangesByCategory('budget')
          };
          break;
        case '$$': // Moderate: $20-$35
          where.priceRange = {
            in: await this.getPriceRangesByCategory('moderate')
          };
          break;
        case '$$$': // Expensive: > $35
          where.priceRange = {
            in: await this.getPriceRangesByCategory('expensive')
          };
          break;
        default:
          where.priceRange = filters.priceRange;
      }
    }

    if (filters?.minRating || filters?.maxRating) {
      where.rating = {};
      if (filters.minRating) where.rating.gte = filters.minRating;
      if (filters.maxRating) where.rating.lte = filters.maxRating;
    }

    // Pagination parameters
    const page = filters?.page || 1;
    const limit = filters?.limit || 8;
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalItems = await prisma.restaurant.count({ where });
    const totalPages = Math.ceil(totalItems / limit);

    // Get paginated data
    const data = await prisma.restaurant.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    });

    return {
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    };
  }

  // Get restaurant by ID
  async getRestaurantById(id: number): Promise<Restaurant | null> {
    if (!id || isNaN(id)) {
      throw new Error('Invalid restaurant ID');
    }
    
    return await prisma.restaurant.findUnique({
      where: { id }
    });
  }



  // Update restaurant
  async updateRestaurant(id: number, data: UpdateRestaurantInput): Promise<Restaurant> {
    if (!id || isNaN(id)) {
      throw new Error('Invalid restaurant ID');
    }
    
    return await prisma.restaurant.update({
      where: { id },
      data
    });
  }

  // Delete restaurant
  async deleteRestaurant(id: number): Promise<void> {
    if (!id || isNaN(id)) {
      throw new Error('Invalid restaurant ID');
    }
    
    await prisma.restaurant.delete({
      where: { id }
    });
  }

  // Get restaurants by cuisine
  async getRestaurantsByCuisine(cuisine: string): Promise<Restaurant[]> {
    return await prisma.restaurant.findMany({
      where: { cuisine },
      orderBy: { rating: 'desc' }
    });
  }

  // Get restaurants by location
  async getRestaurantsByLocation(location: string): Promise<Restaurant[]> {
    return await prisma.restaurant.findMany({
      where: { location },
      orderBy: { rating: 'desc' }
    });
  }

  // Get top rated restaurants
  async getTopRatedRestaurants(limit: number = 5): Promise<Restaurant[]> {
    return await prisma.restaurant.findMany({
      orderBy: { rating: 'desc' },
      take: limit
    });
  }

  // Get restaurants by price range
  async getRestaurantsByPriceRange(priceRange: string): Promise<Restaurant[]> {
    return await prisma.restaurant.findMany({
      where: { priceRange },
      orderBy: { rating: 'desc' }
    });
  }

  // Get unique cuisines
  async getUniqueCuisines(): Promise<string[]> {
    const restaurants = await prisma.restaurant.findMany({
      select: { cuisine: true }
    });
    
    return [...new Set(restaurants.map((r: any) => r.cuisine))] as string[];
  }

  // Get unique locations
  async getUniqueLocations(): Promise<string[]> {
    const restaurants = await prisma.restaurant.findMany({
      select: { location: true }
    });
    
    return [...new Set(restaurants.map((r: any) => r.location))] as string[];
  }

  // Search restaurants by name
  async searchRestaurants(query: string): Promise<Restaurant[]> {
    return await prisma.restaurant.findMany({
      where: {
        name: {
          contains: query
        }
      },
      orderBy: { rating: 'desc' }
    });
  }

  // Helper method to get price ranges by category
  private async getPriceRangesByCategory(category: 'budget' | 'moderate' | 'expensive'): Promise<string[]> {
    const allRestaurants = await prisma.restaurant.findMany({
      select: { priceRange: true }
    });

    const priceRanges = allRestaurants.map(r => r.priceRange);
    
    switch (category) {
      case 'budget':
        return priceRanges.filter(price => {
          const amount = parseInt(price.replace('$', ''));
          return amount < 20;
        });
      case 'moderate':
        return priceRanges.filter(price => {
          const amount = parseInt(price.replace('$', ''));
          return amount >= 20 && amount <= 35;
        });
      case 'expensive':
        return priceRanges.filter(price => {
          const amount = parseInt(price.replace('$', ''));
          return amount > 35;
        });
      default:
        return [];
    }
  }
}
