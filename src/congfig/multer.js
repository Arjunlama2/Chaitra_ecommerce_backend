// multerConfig.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/coudinary'); 
// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'uploads', // Cloudinary folder name
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
  }),
});

// Create Multer instance using Cloudinary storage
const upload = multer({ storage });

module.exports = upload;
