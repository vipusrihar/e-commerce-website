const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review Can not be empty']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Review must have reating'],
    },
    book: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
        required: [true, 'Review must belong to a book']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


// Prevent duplicate reviews (one user per book)
reviewSchema.index({ book: 1, user: 1 }, { unique: true });


// Populate user when querying reviews
// reviewSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'user',
//     select: 'name',
//   });
//   next();
// });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;