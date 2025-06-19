import dotenv from "dotenv";
dotenv.config();
import express from "express";
console.log('✅ CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paystackRoutes from "./routes/paystackRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import uploadRoutes from './routes/uploadRoute.js';



const router = express.Router();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(cookieParser());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
 
  next();
});

// Routes
app.use('/api/paystack', paystackRoutes);
app.use("/api/users", userRoutes); //
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/upload', uploadRoutes);

// Health check route
app.get("/", (req, res) => {
	res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
