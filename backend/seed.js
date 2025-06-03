// seed.js or initialData.js
import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

await User.deleteMany(); // optional: clear users

const adminUser = await User.create({
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123',
  isAdmin: true,
});

console.log('Admin user created:', adminUser);
process.exit();
