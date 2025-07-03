import mongoose from 'mongoose';
import slugify from '../utils/slugify.js';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is important'],
        trim: true
    },
    slug: {
        type: String,
        unique: true,
    },
    author: {
        type: String,
        required: [true, 'Author is important']
    },
    isbn: {
        type: String,
        required: [true, 'ISBN number is important']
    },
    description: {
        type: String,
        required: [true, 'Description is important']
    },
    price: {
        type: Number,
        required: [true, 'Book must have a price'],
        min: [0, 'Price must above Zero']
    },
    category: {
        type: String,
        required: [true, 'A book must belong to a category'],
        enum: {
            values: [
                'fiction', 'non-fiction', 'romance', 'thriller', 'mystery', 'fantasy',
                'science', 'history', 'biography', 'self-help', 'education', 'children',
                'young-adult', 'spirituality', 'philosophy', 'memoir', 'classic', 'poetry',
                'sinhala-literature', 'tamil-literature', 'sri-lankan-history'
            ]
            ,
          message: 'Category must be one of: fiction, non-fiction, romance, thriller, mystery, fantasy, science, history, biography, self-help, education, children, young-adult, spirituality, philosophy, memoir, classic, poetry, sinhala-literature, tamil-literature, sri-lankan-history'

        }
    },
    image: {
        type: String,
        required: [true, 'Image is important']
    },
    stock: {
        type: Number,
        required: [true, 'Stock quantity is must'],
        min: [0, 'Stock can not be negative']
    },
}, { timestamps: true })

bookSchema.set('toJSON', { virtuals: true });
bookSchema.set('toObject', { virtuals: true });

bookSchema.pre('save', function (next) {
    if (!this.slug && this.title) {
        this.slug = slugify(this.title);
    }
    next();
});


bookSchema.virtual('reviews', {
    ref: 'Review',         // the model to link to
    foreignField: 'book',  // field in Review that holds the book reference
    localField: '_id',     // field in Book (this model) that matches
});



const Book = mongoose.model('Book', bookSchema);
export default Book;