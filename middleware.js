const {ListingSchema}=require('./schema.js')
const listing=require('./models/listing')
const Review=require('./models/Reviews.js')
const {reviewSchema } = require('./schema.js');


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl=req.originalUrl
        req.flash('danger', 'You must be logged in ');
        return res.redirect('/login');
    }
    next(); // Continue to the next middleware or route handler if authenticated
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl
    }
    next()
}

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params
    const Listing=await listing.findById(id)
    if(!Listing.owner.equals(res.locals.currUser._id))
    {
        req.flash('danger', 'You are not the owner of this listing ')
        return res.redirect(`/listings/${id}`)
    }
    next()
}
module.exports.validateListing=(req,res,next)=>{
    let{error}=ListingSchema.validate(req.body)
    if(error)
    {
        throw new ExpressError(400,error)
    }else{
        next()
    }
}
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details.map(el => el.message).join(', '));
    } else {
        next();
    }
};
module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params
    const review =await Review.findById(reviewId)
    if(!review.author.equals(res.locals.currUser._id))
    {
        req.flash('danger', 'You are not the Author of this Review ')
        return res.redirect(`/listings/${id}`)
    }
    next()
}
