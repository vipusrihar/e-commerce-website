import Book from '../models/Book.js';
import hashids from '../utils/hashid.js';

// CREATE a new book
const createBook = async (req, res) => {
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

        res.status(500).json({ message: 'Server Error: ' + err.message });
    }
};

// GET all books
const findAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('reviews');
        const response = books.map(book => ({
            ...book.toObject(),
            hashid: hashids.encodeId(book._id.toString()),
        }));
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET a single book by ID
const findBookById = async (req, res) => {
    try {
        const hashid = req.params.hashid;
        const realId = hashids.decodeId(hashid); 

        if (!realId) {
            return res.status(404).json({ message: 'Invalid link' });
        }

        const book = await Book.findById(realId).populate('reviews');
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



// GET a single book by ISBN
const findBookByISBN = async (req, res) => {
    try {
        const book = await Book.findOne({ isbn: req.params.isbn });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE a book
const updateBook = async (req, res) => {

    try {
        const decodedId = hashids.decodeId(req.params.hashid);

        if (!decodedId) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const updated = await Book.findByIdAndUpdate(decodedId, req.body, {
            new: true,
            runValidators: true
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
const  deleteBook = async (req, res) => {
    try {
        const decodedId = hashids.decodeId(req.params.hashid);
        if (!decodedId) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const deleted = await Book.findByIdAndDelete(decodedId);
        if (!deleted) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export async function countBooks(req, res) {
    try {
        const count = await Book.countDocuments();
        console.info("Book",count)
        res.status(200).json({ count });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to count books' });
    }
};


export default {
    createBook,
    findAllBooks,
    findBookById,
    findBookByISBN,
    updateBook,
    deleteBook, 
    countBooks
};  
