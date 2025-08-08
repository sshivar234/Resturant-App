# Flavor Fusion - Restaurant Discovery Platform

A modern, full-stack web application for discovering and managing restaurant listings. Built with React, TypeScript, Node.js, and Prisma ORM.


##  Features

### Core Functionality
- **Restaurant Discovery**: Browse through a curated collection of restaurants
- **Advanced Search**: Real-time search with debouncing (300ms delay)
- **Smart Filtering**: Filter by cuisine, location, price range, and rating
- **Pagination**: Navigate through restaurants with 8 items per page
- **Responsive Design**: Mobile-first approach with Tailwind CSS

###  Visual Features
- **Beautiful UI**: Modern card-based layout with hover effects
- **Image Optimization**: Automatic image resizing and cropping via Unsplash API
- **Star Ratings**: Visual star rating system (★☆☆☆☆ to ★★★★★)
- **Price Categories**: Dynamic price categorization (Budget, Moderate, Expensive)

###  Management Features
- **Edit Restaurants**: Update name, cuisine, location, rating, and price
- **Delete Restaurants**: Remove restaurants with confirmation dialog
- **Real-time Updates**: Instant UI updates after CRUD operations

###  User Experience
- **Clickable Title**: "Flavor Fusion" title resets filters and search
- **Loading States**: Visual feedback during data fetching
- **Error Handling**: Comprehensive error messages and recovery
- **Search Hints**: Helpful search suggestions and feedback

##  Tech Stack Versions

### Frontend
- **React 19.1.0**: Modern React with hooks and functional components
- **TypeScript 5.8.3**: Type-safe development
- **Vite 7.0.4**: Fast build tool and development server
- **Tailwind CSS 3.3.3**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
  - Dialog, Dropdown Menu, Label, Select, Toast
- **Lucide React**: Beautiful icon library
- **Class Variance Authority**: Component variant management

### Backend
- **Node.js**: JavaScript runtime
- **Express 5.1.0**: Web application framework
- **TypeScript 5.9.2**: Type-safe server development
- **Prisma 6.13.0**: Modern database ORM
- **SQLite**: Lightweight database for development
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Development Tools
- **Nodemon**: Auto-restart server during development
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing


## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd resturant-app
```

### 2. Backend Setup
```bash
cd server

# Install dependencies
npm install

# Create environment file
echo "DATABASE_URL=\"file:./dev.db\"" > .env

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed the database with sample data
npx prisma db seed

# Start the development server
npm run dev
```

### 3. Frontend Setup
```bash
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Prisma Studio**: http://localhost:5555 (run `npx prisma studio` in server directory)

## Database Schema
1) Restaurant Model

model Restaurant {
  id          Int     
  name        String
  cuisine     String
  imageUrl    String
  location    String
  rating      Int
  description String?  
  priceRange  String   
  createdAt   DateTime 
  updatedAt   DateTime 
}
```

### Sample Data
The application comes pre-loaded with 20 diverse restaurants including:
- **Cuisines**: Italian, Japanese, American, Mexican, Indian, Vietnamese, Chinese, French, Thai, Korean, Mediterranean, Greek, Lebanese, Turkish, Moroccan, Persian
- **Locations**: Downtown, Westside, Northside, Eastside, Southside, Uptown, Chinatown, Riverside, Midtown, Harbor District, Old Town, Cultural District, University Area, Arts Quarter, Historic District
- **Price Ranges**: $18 to $58 (Budget: <$20, Moderate: $20-$35, Expensive: >$35)
- **Ratings**: 3 to 5 stars

## API Endpoints

### Restaurant Management
- `GET /api/restaurants` - Get all restaurants with pagination and filters
- `GET /api/restaurants/:id` - Get restaurant by ID
- `PUT /api/restaurants/:id` - Update restaurant
- `DELETE /api/restaurants/:id` - Delete restaurant

### Filtering & Search
- `GET /api/restaurants/cuisine/:cuisine` - Filter by cuisine
- `GET /api/restaurants/location/:location` - Filter by location
- `GET /api/restaurants/price/:priceRange` - Filter by price range
- `GET /api/restaurants/search?q=query` - Search by name
- `GET /api/restaurants/top-rated` - Get top-rated restaurants

### Metadata
- `GET /api/restaurants/cuisines` - Get unique cuisines
- `GET /api/restaurants/locations` - Get unique locations
- `GET /api/health` - Health check endpoint

### Query Parameters
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 8)
- `cuisine`: Filter by cuisine
- `location`: Filter by location
- `priceRange`: Filter by price range ($, $$, $$$, or specific amount)
- `minRating`: Minimum rating filter
- `maxRating`: Maximum rating filter

## Frontend Components

### Header Component
- **Search Bar**: Real-time search with debouncing
- **Title**: Clickable "Flavor Fusion" that resets filters
- **Loading States**: Visual feedback during search
- **Clear Button**: Clear search input

### Filter Component
- **Cuisine Dropdown**: Filter by restaurant cuisine
- **Location Dropdown**: Filter by restaurant location
- **Price Range Dropdown**: Filter by price category
- **Rating Filter**: Filter by star rating

### RestaurantList Component
- **Grid Layout**: Responsive card grid (2x4 on desktop)
- **Loading State**: Skeleton loading animation
- **Empty State**: Message when no restaurants found

### RestaurantCard Component
- **Image Display**: Optimized restaurant images
- **Restaurant Info**: Name, cuisine, location, rating, price
- **Edit Form**: Inline editing for all restaurant fields
- **Delete Button**: Confirmation dialog before deletion
- **Hover Effects**: Edit/delete buttons appear on hover

### Pagination Component
- **Page Numbers**: Smart display (max 5 visible)
- **Navigation**: Previous/Next buttons
- **Current Page**: Highlighted active page
- **Disabled States**: Proper button states

## Usage Guide

### Browsing Restaurants
1. **View All**: See all restaurants on the main page
2. **Navigate Pages**: Use pagination controls at the bottom
3. **View Details**: Hover over cards to see edit/delete options

### Searching & Filtering
1. **Search**: Type in the search bar for real-time results
2. **Filter by Cuisine**: Select from dropdown menu
3. **Filter by Location**: Choose from available locations
4. **Filter by Price**: Select Budget, Moderate, or Expensive
5. **Filter by Rating**: Choose minimum star rating
6. **Reset Filters**: Click "Flavor Fusion" title

### Managing Restaurants
1. **Edit Restaurant**: 
   - Hover over card and click edit button
   - Modify name, cuisine, location, rating, or price
   - Click save to update
2. **Delete Restaurant**:
   - Hover over card and click delete button
   - Confirm deletion in dialog
   - Restaurant is removed immediately

