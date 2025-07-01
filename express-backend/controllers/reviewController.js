import Review from '../models/Review.js';

//create a new review
export async function createReview(req, res) {
    try {
        const { review, rating, book } = req.body;

        const newReview = await create({
            review,
            rating,
            book,
            user: req.user.id  
        });

        res.status(201).json(newReview);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'You have already reviewed this book.' });
        }
        res.status(500).json({ message: err.message });
    }
}

//get all reviews
export async function getAllReviews(req, res) {
    try {
        const reviews = await find()
            .populate('user', 'name')
            .populate('book', 'title');

        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//get reviews by book ID
export async function getReviewsByBook(req, res) {
    try {
        const reviews = await find({ book: req.params.bookId })
            .populate('book', 'title')
            .populate('user', 'name');

        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Update a review (only if it's the user’s own review)
export async function updateReview(req, res) {
    try {
        const review = await findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!review) return res.status(404).json({ message: 'Review not found or not yours' });

        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export async function getReviewsByUser(req, res) {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const reviews = await find({ user: userId })
            .populate('user', 'name')   
            .populate('book', 'title'); 

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete a review (only if it's the user’s own review)
export async function deleteReview(req, res) {
    try {
        const deleted = await findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!deleted) return res.status(404).json({ message: 'Review not found or not yours' });

        res.status(200).json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export default {
    createReview,
    getAllReviews,
    getReviewsByBook,
    updateReview,
    getReviewsByUser,
    deleteReview
};
