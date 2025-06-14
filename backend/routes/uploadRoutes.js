import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file uploaded' });
  }

  res.status(200).json({
    url: req.file.path,  // Cloudinary auto-sets the `path` as the image URL
    public_id: req.file.filename,
  });
});

export default router;
// backend/routes/uploadRoutes.js
// import express from 'express';
// import { upload } from '../middleware/uploadMiddleware.js'; // multer + Cloudinary
// const router = express.Router();

// router.post('/', upload.array('images', 5), (req, res) => {
//   const imageUrls = req.files.map(file => file.path);
//   res.status(200).json({ imageUrls });
// });

// export default router;
