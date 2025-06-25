const Review = require('../models/Review');

//create a new review
exports.createReview = async (req, res) => {
    try {
        const { review, rating, book } = req.body;

        const newReview = await Review.create({
            review,
            rating,
            book,
            user: req.user.id  // assuming you're using auth middleware
        });

        res.status(201).json(newReview);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'You have already reviewed this book.' });
        }
        res.status(500).json({ message: err.message });
    }
};

//get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('user', 'name')
            .populate('book', 'title');

        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//get reviews by book ID
exports.getReviewsByBook = async (req, res) => {
    try {
        const reviews = await Review.find({ book: req.params.bookId })
            .populate('user', 'name');

        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a review (only if it's the user’s own review)
exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!review) return res.status(404).json({ message: 'Review not found or not yours' });

        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a review (only if it's the user’s own review)
exports.deleteReview = async (req, res) => {
    try {
        const deleted = await Review.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!deleted) return res.status(404).json({ message: 'Review not found or not yours' });

        res.status(200).json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
