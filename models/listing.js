const mongoose = require("mongoose");
const reviews = require("./Reviews");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "default.jpg", // Optional: Default filename
        },
        url: {
            type: String,
        },
    },
    price: {
        type: Number,
        min: 0,
    },
    location: {
        type: String,
    },
    country: String,
    reviews: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Review',
        },
      ],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await reviews.deleteMany({_id:{$in:listing.reviews}})
    }
})

const listing = mongoose.model("listing", listingSchema);
module.exports = listing;
