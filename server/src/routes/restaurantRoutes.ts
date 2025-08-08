import { Router } from 'express';
import { RestaurantController } from '../controllers/restaurantController';

const router = Router();
const restaurantController = new RestaurantController();

// Basic CRUD routes
router.get('/', restaurantController.getAllRestaurants.bind(restaurantController));
router.post('/', restaurantController.createRestaurant.bind(restaurantController));

// Special routes (must come before /:id route)
router.get('/top-rated', restaurantController.getTopRatedRestaurants.bind(restaurantController));
router.get('/cuisines', restaurantController.getUniqueCuisines.bind(restaurantController));
router.get('/locations', restaurantController.getUniqueLocations.bind(restaurantController));
router.get('/search', restaurantController.searchRestaurants.bind(restaurantController));

// Filter routes
router.get('/cuisine/:cuisine', restaurantController.getRestaurantsByCuisine.bind(restaurantController));
router.get('/location/:location', restaurantController.getRestaurantsByLocation.bind(restaurantController));
router.get('/price/:priceRange', restaurantController.getRestaurantsByPriceRange.bind(restaurantController));

// ID-based routes (must come last)
router.get('/:id', restaurantController.getRestaurantById.bind(restaurantController));
router.put('/:id', restaurantController.updateRestaurant.bind(restaurantController));
router.delete('/:id', restaurantController.deleteRestaurant.bind(restaurantController));

export default router;
