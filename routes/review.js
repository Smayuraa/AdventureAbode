const express=require('express')
const router=express.Router({mergeParams:true})
const Review=require('../models/Reviews.js')
const {reviewSchema } = require('../schema.js');
const wrapAsync=require('../utils/wrapAsync')
const listing=require('../models/listing')
const {isLoggedIn,validateReview,isReviewAuthor}=require('../middleware.js')
const controller=require('../controllers/reviews.js')

// const validateReview = (req, res, next) => {
//     const { error } = reviewSchema.validate(req.body);
//     if (error) {
//         throw new ExpressError(400, error.details.map(el => el.message).join(', '));
//     } else {
//         next();
//     }
// };


//Review post route
router.post('/',isLoggedIn, validateReview, wrapAsync(controller.postReview));
 
router.delete('/:reviewId',isLoggedIn,isReviewAuthor, wrapAsync(controller.deleteReview));


module.exports=router