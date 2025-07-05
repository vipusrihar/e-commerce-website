import Discount from '../models/Discount.js'

export async function createDiscount(req, res) {
    console.log("Request", req.body)
    try {
        const { code, amount, validFrom, validTo, appliesToAll, books } = req.body.discount;

        if (!code || !amount || !validFrom || !validTo) {
            console.log("error here")
            return res.status(400).json({ message: 'Required fields missing' });
        }

        if (!appliesToAll && (!books || books.length === 0)) {
            return res.status(400).json({ message: 'Please select at least one book for specific discount' });
        }

        const discountData = {
            code: code.toUpperCase().trim(),
            amount,
            validFrom,
            validTo,
            appliesToAll,
            books: appliesToAll ? [] : books,
        };

        const savedDiscount = await Discount.create(discountData);
        res.status(201).json(savedDiscount);
    } catch (error) {
        console.error('Discount creation error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}


export async function editDiscount(req, res) {
    console.log("Request", req)
    try {
        const { id } = req.params;
        const { code, amount, validFrom, validTo, appliesToAll, books } = req.body;

        if (!code || !amount || !validFrom || !validTo) {
            return res.status(400).json({ message: 'Required fields missing' });
        }

        if (!appliesToAll && (!books || books.length === 0)) {
            console.log("error here")
            return res.status(400).json({ message: 'Please provide at least one book for specific discount' });

        }

        const updatedDiscount = await Discount.findByIdAndUpdate(
            id,
            {
                code: code.toUpperCase().trim(),
                amount,
                validFrom,
                validTo,
                appliesToAll,
                books: appliesToAll ? [] : books,
            },
            { new: true }
        ).populate('books').exec();

        if (!updatedDiscount) {
            return res.status(404).json({ message: 'Discount not found' });
        }

        res.status(200).json(updatedDiscount);
    } catch (error) {
        console.error('Edit discount error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}

export async function getAllDiscounts(req, res) {
    try {
        const now = new Date();

        //update expired discounts
        await Discount.updateMany(
            { validTo: { $lt: now }, active: true },
            { $set: { active: false } }
        );

        //get updated discounts
        const discounts = await Discount.find()
            .sort({ createdAt: -1 })
            .populate('books')
            .exec();

        res.status(200).json(discounts);
    } catch (error) {
        console.error('Error fetching discounts:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}


// It will retrun only valid discounts available for this book
export async function findDiscountByBookId(req, res) {
    try {
        const { bookId } = req.params;

        if (!bookId) {
            return res.status(400).json({ message: 'Book ID is required' });
        }

        const now = new Date();

        const discounts = await Discount.find({
            active: true,
            validFrom: { $lte: now },
            validTo: { $gte: now },
            $or: [
                { appliesToAll: true },
                { books: bookId }
            ]
        });

        res.status(200).json(discounts);
    } catch (error) {
        console.error('Error finding discount:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}


export async function updateDiscountStatus() {
    const now = new Date();

    // Disable discounts where validTo < now
    await Discount.updateMany(
        { validTo: { $lt: now }, active: true },
        { active: false }
    ).populate('books').exec();;

    // Enable discounts that are currently valid
    await Discount.updateMany(
        { validFrom: { $lte: now }, validTo: { $gte: now }, active: false },
        { active: true }
    ).populate('books').exec();;
}

//It will only allow to edit active status for  discounts which in valid period
export async function updateDiscountStatusById(req, res) {
    try {
        const { id } = req.params;
        const { active } = req.body;

        console.log('Full request body:', req.body);
        console.log('Active:', active);

        if (typeof active !== 'boolean') {
            return res.status(400).json({ message: 'Active status must be a boolean' });
        }

        const discount = await Discount.findByIdAndUpdate(
            id,
            {
                active,
                validFrom: { $lte: now },
                validTo: { $gte: now },
            },
            { new: true }
        ).populate('books').exec();;

        if (!discount) {
            return res.status(404).json({ message: 'Discount not found' });
        }

        res.status(200).json({ message: 'Discount status updated', discount });
    } catch (error) {
        console.error('Error updating discount status:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}


export default {
    createDiscount,
    updateDiscountStatus,
    updateDiscountStatusById,
    editDiscount,
    getAllDiscounts,
    findDiscountByBookId
}