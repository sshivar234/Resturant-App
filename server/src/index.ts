import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import restaurantRoutes from './routes/restaurantRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Restaurant API is running' });
});

// Routes
app.use('/api/restaurants', restaurantRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`  Server running on http://localhost:${PORT}`);
  console.log(`  API endpoints:`);
  console.log(`   GET  /api/health`);
  console.log(`   GET  /api/restaurants`);
  console.log(`   POST /api/restaurants`);
  console.log(`   GET  /api/restaurants/:id`);
  console.log(`   PUT  /api/restaurants/:id`);
  console.log(`   DELETE /api/restaurants/:id`);
  console.log(`   GET  /api/restaurants/cuisine/:cuisine`);
  console.log(`   GET  /api/restaurants/location/:location`);
  console.log(`   GET  /api/restaurants/price/:priceRange`);
  console.log(`   GET  /api/restaurants/top-rated`);
  console.log(`   GET  /api/restaurants/cuisines`);
  console.log(`   GET  /api/restaurants/locations`);
  console.log(`   GET  /api/restaurants/search?q=query`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n Shutting down server...');
  process.exit(0);
});
