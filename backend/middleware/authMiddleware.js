import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// Middleware to protect private routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in httpOnly cookie first
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // Fallback: Check for token in Authorization header (for tools like Postman)
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // If no token found
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

// Middleware to allow only admin users
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };




// import jwt from 'jsonwebtoken';
// import asyncHandler from 'express-async-handler';
// import User from '../models/User.js';

// // @desc    Protect private routes
// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   // Check cookie first
//   if (req.cookies && req.cookies.jwt) {
//     token = req.cookies.jwt;
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error('Not authorized, no token');
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');
//     next();
//   } catch (error) {
//     res.status(401);
//     throw new Error('Not authorized, token failed');
//   }
// });

// // @desc    Admin only
// const admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(403);
//     throw new Error('Not authorized as admin');
//   }
// };

// export { protect, admin };




// // import jwt from "jsonwebtoken";
// // import asyncHandler from "express-async-handler";
// // import User from "../models/User.js";

// // // Protect routes (check for logged in user)
// // const protect = asyncHandler(async (req, res, next) => {
// // 	let token;

// // 	if (
// // 		req.headers.authorization &&
// // 		req.headers.authorization.startsWith("Bearer")
// // 	) {
// // 		try {
// // 			token = req.headers.authorization.split(" ")[1];
// // 			console.log("Auth Header:", req.headers.authorization);

// // 			const decoded = jwt.verify(token, process.env.JWT_SECRET);

// // 			req.user = await User.findById(decoded.id).select("-password");

// // 			next();
// // 		} catch (error) {
// // 			res.status(401);
// // 			throw new Error("Not authorized, token failed");
// // 		}
// // 	}

// // 	if (!token) {
// // 		res.status(401);
// // 		throw new Error("Not authorized, no token");
// // 	}
// // });

// // // Admin middleware to check user role
// // const admin = (req, res, next) => {
// // 	if (req.user && req.user.isAdmin) {
// // 		next();
// // 	} else {
// // 		res.status(401);
// // 		throw new Error("Not authorized as an admin");
// // 	}
// // };

// // export { protect, admin };

// import jwt from "jsonwebtoken";
// import asyncHandler from "express-async-handler";
// import User from "../models/User.js";

// // Middleware to protect private routes
// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   // First: Try to get token from httpOnly cookie
//   if (req.cookies && req.cookies.jwt) {
//     token = req.cookies.jwt;
//   }
//   // Fallback: Try to get token from Authorization header (for Postman etc.)
//   else if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   //  No token found
//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");
//       console.log('Logged-in user:', req.user.email);
//     next();
//   } catch (error) {
//     res.status(401);
//     throw new Error("Not authorized, token failed");
//   }
// });

// // Middleware to restrict access to admins only
// const admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(401);
//     throw new Error("Not authorized as an admin");
//   }
// };

// export { protect, admin };

