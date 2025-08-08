import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const restaurants = [
  {
    name: "Pizza Palace",
    cuisine: "Italian",
    imageUrl: "https://images.unsplash.com/photo-1651440204227-a9a5b9d19712",
    location: "Downtown",
    rating: 4,
    description: "Authentic Italian pizza with fresh ingredients and wood-fired ovens.",
    priceRange: "$28"
  },
  {
    name: "Sushi Master",
    cuisine: "Japanese",
    imageUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    location: "Westside",
    rating: 5,
    description: "Premium sushi and sashimi prepared by master chefs with the freshest fish.",
    priceRange: "$45"
  },
  {
    name: "Burger Barn",
    cuisine: "American",
    imageUrl: "https://images.unsplash.com/photo-1652465485624-be97a5074683",
    location: "Northside",
    rating: 3,
    description: "Classic American burgers with hand-cut fries and milkshakes.",
    priceRange: "$18"
  },
  {
    name: "Taco Fiesta",
    cuisine: "Mexican",
    imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
    location: "Eastside",
    rating: 4,
    description: "Authentic Mexican tacos with fresh salsa and homemade tortillas.",
    priceRange: "$22"
  },
  {
    name: "Curry House",
    cuisine: "Indian",
    imageUrl: "https://images.unsplash.com/photo-1550367363-ea12860cc124",
    location: "Downtown",
    rating: 4,
    description: "Traditional Indian curries with aromatic spices and fresh naan bread.",
    priceRange: "$32"
  },
  {
    name: "Pho Delight",
    cuisine: "Vietnamese",
    imageUrl: "https://images.unsplash.com/photo-1457460866886-40ef8d4b42a0",
    location: "Southside",
    rating: 5,
    description: "Authentic Vietnamese pho with rich broth and fresh herbs.",
    priceRange: "$19"
  },
  {
    name: "Steak House",
    cuisine: "American",
    imageUrl: "https://images.unsplash.com/photo-1651978595428-b79169f223a5",
    location: "Uptown",
    rating: 5,
    description: "Premium steaks grilled to perfection with classic sides.",
    priceRange: "$58"
  },
  {
    name: "Pasta Paradise",
    cuisine: "Italian",
    imageUrl: "https://images.unsplash.com/photo-1502998070258-dc1338445ac2",
    location: "Westside",
    rating: 4,
    description: "Fresh pasta dishes with homemade sauces and Italian wines.",
    priceRange: "$35"
  },
  {
    name: "Dragon Palace",
    cuisine: "Chinese",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947",
    location: "Chinatown",
    rating: 3,
    description: "Traditional Chinese cuisine with dim sum and Peking duck.",
    priceRange: "$29"
  },
  {
    name: "Bistro Francais",
    cuisine: "French",
    imageUrl: "https://images.unsplash.com/photo-1568376794508-ae52c6ab3929",
    location: "Downtown",
    rating: 5,
    description: "Elegant French bistro with classic dishes and fine wines.",
    priceRange: "$52"
  },
  {
    name: "Thai Spice",
    cuisine: "Thai",
    imageUrl: "https://images.unsplash.com/photo-1651981075280-9a9e01acbff0",
    location: "Eastside",
    rating: 4,
    description: "Authentic Thai cuisine with bold flavors and fresh ingredients.",
    priceRange: "$38"
  },
  {
    name: "BBQ Joint",
    cuisine: "American",
    imageUrl: "https://images.unsplash.com/photo-1652690772837-4f270f7f87a2",
    location: "Southside",
    rating: 4,
    description: "Slow-smoked BBQ ribs and brisket with homemade sauces.",
    priceRange: "$42"
  },
  {
    name: "Mediterranean Delight",
    cuisine: "Mediterranean",
    imageUrl: "https://images.unsplash.com/photo-1651440204317-acca48e8a7bc",
    location: "Riverside",
    rating: 4,
    description: "Fresh Mediterranean dishes with olive oil, herbs, and grilled seafood.",
    priceRange: "$36"
  },
  {
    name: "Korean BBQ House",
    cuisine: "Korean",
    imageUrl: "https://images.unsplash.com/photo-1652465485553-37e8a38201f9",
    location: "Midtown",
    rating: 5,
    description: "Authentic Korean BBQ with premium meats and traditional side dishes.",
    priceRange: "$48"
  },
  {
    name: "Seafood Harbor",
    cuisine: "Seafood",
    imageUrl: "https://images.unsplash.com/photo-1513442542250-854d436a73f2",
    location: "Harbor District",
    rating: 4,
    description: "Fresh seafood caught daily with ocean views and coastal cuisine.",
    priceRange: "$55"
  },
  {
    name: "Greek Taverna",
    cuisine: "Greek",
    imageUrl: "https://images.unsplash.com/photo-1652465485209-28584fd8f9cd",
    location: "Old Town",
    rating: 4,
    description: "Traditional Greek dishes with moussaka, souvlaki, and baklava.",
    priceRange: "$31"
  },
  {
    name: "Lebanese Garden",
    cuisine: "Lebanese",
    imageUrl: "https://images.unsplash.com/photo-1564758565388-0d5da0cbb08c",
    location: "Cultural District",
    rating: 4,
    description: "Authentic Lebanese cuisine with hummus, falafel, and shawarma.",
    priceRange: "$26"
  },
  {
    name: "Turkish Kebab",
    cuisine: "Turkish",
    imageUrl: "https://images.unsplash.com/photo-1652465485504-6bab45ec21de",
    location: "University Area",
    rating: 3,
    description: "Traditional Turkish kebabs and mezze platters with warm hospitality.",
    priceRange: "$24"
  },
  {
    name: "Moroccan Spice",
    cuisine: "Moroccan",
    imageUrl: "https://images.unsplash.com/photo-1651980979183-79425af50103",
    location: "Arts Quarter",
    rating: 4,
    description: "Exotic Moroccan tagines and couscous with aromatic spices.",
    priceRange: "$39"
  },
  {
    name: "Persian Palace",
    cuisine: "Persian",
    imageUrl: "https://images.unsplash.com/photo-1629471722874-13d4208d62ea",
    location: "Historic District",
    rating: 5,
    description: "Elegant Persian cuisine with saffron rice, kebabs, and rosewater desserts.",
    priceRange: "$44"
  }
];

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.restaurant.deleteMany();

  // Insert new restaurants
  for (const restaurant of restaurants) {
    await prisma.restaurant.create({
      data: restaurant
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log(`📊 Created ${restaurants.length} restaurants`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 