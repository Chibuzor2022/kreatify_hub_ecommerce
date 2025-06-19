import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();
await connectDB();

const seedProducts = async () => {
  try {
    // Clear collections
    await Product.deleteMany();

    const adminUser = await User.findOne({ isAdmin: true });
    if (!adminUser) {
      throw new Error('Admin user not found. Please seed users first.');
    }

    // Products to insert
    const products = [
      {
        name: 'Wireless Headphones',
        images: '/images/headphones.jpg',
        brand: 'Sony',
        category: 'Electronics',
        description: 'Noise cancelling headphones with great sound quality.',
        price: 99.99,
        countInStock: 10,
        rating: 0,
        numReviews: 0,
        user: adminUser._id,
      },
      {
        name: 'Running Shoes',
        image: '/images/shoes.jpg',
        brand: 'Nike',
        category: 'Footwear',
        description: 'Lightweight shoes with excellent grip.',
        price: 120.0,
        countInStock: 5,
        rating: 0,
        numReviews: 0,
        user: adminUser._id,
      },
      {
        name: 'Smartphone',
        image: '/images/phone.jpg',
        brand: 'Samsung',
        category: 'Electronics',
        description: 'Fast performance and beautiful display.',
        price: 499.99,
        countInStock: 15,
        rating: 0,
        numReviews: 0,
        user: adminUser._id,
      },
    ];

    const createdProducts = await Product.insertMany(products);
    console.log('Products seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding products failed:', error);
    process.exit(1);
  }
};

seedProducts();
