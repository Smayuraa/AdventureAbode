const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { ListingSchema } = require('../schema.js');
const listing = require('../models/listing');
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');
const controller = require('../controllers/listings.js');
const multer = require('multer');
const { storage } = require('../cloudConfig.js'); // Destructuring the storage
const upload = multer({ storage });

// Index Route
router.get('/', wrapAsync(controller.index));

// New Router
router.get('/new', isLoggedIn, controller.newForm);

// Create Router
router.post(
    '/',
    isLoggedIn,
    upload.single('Listing[image]'),
    wrapAsync(controller.create)
);

// Edit Router
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(controller.edit));

// Show Router
router
    .route('/:id')
    .get(controller.show)
    .put(isLoggedIn,
        isOwner,
        upload.single('Listing[image]'),
         wrapAsync(controller.update))
    .delete(isLoggedIn, isOwner, wrapAsync(controller.delete));

module.exports = router;
