const Review=require('../models/Reviews.js')
const listing=require('../models/listing')

module.exports.postReview=async (req, res) => {

    const Listing = await listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    Listing.reviews.push(newReview);
    await newReview.save();
    await Listing.save();
    req.flash('success', 'Review added successfully');
    res.redirect(`/listings/${Listing._id}`);
}
module.exports.deleteReview=async (req, res) => {
    const { id, reviewId } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // Remove review reference
    await Review.findByIdAndDelete(reviewId); // Delete the review
    req.flash('success', 'Review deleted successfully');
    res.redirect(`/listings/${id}`); // Redirect to the listing page
}