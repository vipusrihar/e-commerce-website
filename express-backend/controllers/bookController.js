const Book = require('../models/Book');

// CREATE a new book
exports.createBook = async (req, res) => {
    try {
        const { title, author, isbn, description, price, category, image, stock } = req.body;

        if (!title || !author || !isbn || !price) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingBook = await Book.findOne({ isbn });
        if (existingBook) {
            return res.status(400).json({ message: 'Book already exists' });
        }

        const book = new Book({ title, author, isbn, description, price, category, image, stock });
        await book.save();

        res.status(201).json(book);
    } catch (err) {
        console.error(err); // helpful for debugging
        res.status(500).json({ message: 'Server Error: ' + err.message });
    }
};

// GET all books
exports.findAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('reviews');
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET a single book by ID
exports.findBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('reviews');
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET a single book by ISBN
exports.findBookByISBN = async (req, res) => {
    try {
        const book = await Book.findOne({isbn : req.params.isbn});
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE a book
exports.updateBook = async (req, res) => {
    try {
        const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true  // Makes sure the update follows the validation rules from your Mongoose schema.
        });
        if (!updated) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE a book
exports.deleteBook = async (req, res) => {
    try {
        const deleted = await Book.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
