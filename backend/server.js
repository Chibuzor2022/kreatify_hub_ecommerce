import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paystackRoutes from "./routes/paystack.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import uploadRoutes from './routes/uploadRoutes.js';



// Load environment variables
dotenv.config();

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
  console.log(`Incoming ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Routes
app.use("/api/users", userRoutes); //
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/paystack", paystackRoutes);
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
