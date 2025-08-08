import { Request, Response } from 'express';
import { RestaurantService } from '../services/restaurantService';
import type { UpdateRestaurantInput, RestaurantFilters } from '../types/restaurant';

const restaurantService = new RestaurantService();

export class RestaurantController {
  // Get all restaurants
  async getAllRestaurants(req: Request, res: Response): Promise<void> {
    try {
      const filters: RestaurantFilters = {
        cuisine: req.query.cuisine as string,
        location: req.query.location as string,
        priceRange: req.query.priceRange as string,
        minRating: req.query.minRating ? parseInt(req.query.minRating as string) : undefined,
        maxRating: req.query.maxRating ? parseInt(req.query.maxRating as string) : undefined,
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 8
      };

      const result = await restaurantService.getAllRestaurants(filters);
      res.json(result);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      res.status(500).json({ error: 'Failed to fetch restaurants' });
    }
  }

  // Get restaurant by ID
  async getRestaurantById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      // Validate ID parameter
      if (!id || isNaN(parseInt(id))) {
        res.status(400).json({ error: 'Invalid restaurant ID' });
        return;
      }
      
      const restaurant = await restaurantService.getRestaurantById(parseInt(id));
      
      if (!restaurant) {
        res.status(404).json({ error: 'Restaurant not found' });
        return;
      }
      
      res.json(restaurant);
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      res.status(500).json({ error: 'Failed to fetch restaurant' });
    }
  }



  // Update restaurant
  async updateRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data: UpdateRestaurantInput = req.body;
      
      // Validate ID parameter
      if (!id || isNaN(parseInt(id))) {
        res.status(400).json({ error: 'Invalid restaurant ID' });
        return;
      }
      
      // Validate rating range if provided
      if (data.rating && (data.rating < 1 || data.rating > 5)) {
        res.status(400).json({ error: 'Rating must be between 1 and 5' });
        return;
      }
      
      // Validate price range if provided (now accepts specific dollar amounts)
      if (data.priceRange) {
        // Allow both old format ($, $$, $$$) and new format ($XX)
        const isValidOldFormat = ['$', '$$', '$$$'].includes(data.priceRange);
        const isValidNewFormat = /^\$\d+$/.test(data.priceRange);
        
        if (!isValidOldFormat && !isValidNewFormat) {
          res.status(400).json({ error: 'Price range must be $, $$, $$$, or specific amount like $25' });
          return;
        }
      }
      
      const restaurant = await restaurantService.updateRestaurant(parseInt(id), data);
      res.json(restaurant);
    } catch (error) {
      console.error('Error updating restaurant:', error);
      res.status(500).json({ error: 'Failed to update restaurant' });
    }
  }

  // Delete restaurant
  async deleteRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      // Validate ID parameter
      if (!id || isNaN(parseInt(id))) {
        res.status(400).json({ error: 'Invalid restaurant ID' });
        return;
      }
      
      await restaurantService.deleteRestaurant(parseInt(id));
      res.json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      res.status(500).json({ error: 'Failed to delete restaurant' });
    }
  }

  // Get restaurants by cuisine
  async getRestaurantsByCuisine(req: Request, res: Response): Promise<void> {
    try {
      const { cuisine } = req.params;
      const restaurants = await restaurantService.getRestaurantsByCuisine(cuisine);
      res.json(restaurants);
    } catch (error) {
      console.error('Error fetching restaurants by cuisine:', error);
      res.status(500).json({ error: 'Failed to fetch restaurants by cuisine' });
    }
  }

  // Get restaurants by location
  async getRestaurantsByLocation(req: Request, res: Response): Promise<void> {
    try {
      const { location } = req.params;
      const restaurants = await restaurantService.getRestaurantsByLocation(location);
      res.json(restaurants);
    } catch (error) {
      console.error('Error fetching restaurants by location:', error);
      res.status(500).json({ error: 'Failed to fetch restaurants by location' });
    }
  }

  // Get top rated restaurants
  async getTopRatedRestaurants(req: Request, res: Response): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
      const restaurants = await restaurantService.getTopRatedRestaurants(limit);
      res.json(restaurants);
    } catch (error) {
      console.error('Error fetching top rated restaurants:', error);
      res.status(500).json({ error: 'Failed to fetch top rated restaurants' });
    }
  }

  // Get restaurants by price range
  async getRestaurantsByPriceRange(req: Request, res: Response): Promise<void> {
    try {
      const { priceRange } = req.params;
      // Allow both old format ($, $$, $$$) and new format ($XX)
      const isValidOldFormat = ['$', '$$', '$$$'].includes(priceRange);
      const isValidNewFormat = /^\$\d+$/.test(priceRange);
      
      if (!isValidOldFormat && !isValidNewFormat) {
        res.status(400).json({ error: 'Price range must be $, $$, $$$, or specific amount like $25' });
        return;
      }
      
      const restaurants = await restaurantService.getRestaurantsByPriceRange(priceRange);
      res.json(restaurants);
    } catch (error) {
      console.error('Error fetching restaurants by price range:', error);
      res.status(500).json({ error: 'Failed to fetch restaurants by price range' });
    }
  }

  // Get unique cuisines
  async getUniqueCuisines(req: Request, res: Response): Promise<void> {
    try {
      const cuisines = await restaurantService.getUniqueCuisines();
      res.json(cuisines);
    } catch (error) {
      console.error('Error fetching unique cuisines:', error);
      res.status(500).json({ error: 'Failed to fetch unique cuisines' });
    }
  }

  // Get unique locations
  async getUniqueLocations(req: Request, res: Response): Promise<void> {
    try {
      const locations = await restaurantService.getUniqueLocations();
      res.json(locations);
    } catch (error) {
      console.error('Error fetching unique locations:', error);
      res.status(500).json({ error: 'Failed to fetch unique locations' });
    }
  }

  // Search restaurants
  async searchRestaurants(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        res.status(400).json({ error: 'Search query is required' });
        return;
      }
      
      const restaurants = await restaurantService.searchRestaurants(q);
      res.json(restaurants);
    } catch (error) {
      console.error('Error searching restaurants:', error);
      res.status(500).json({ error: 'Failed to search restaurants' });
    }
  }
} 