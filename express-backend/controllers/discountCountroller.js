import Discount from '../models/Discount.js'

export async function createDiscount(req, res) {
    try {
        const { code, amount, validFrom, validTo, appliesToAll, books, active } = req.body.discount;

        if (!code || !amount || !validFrom || !validTo) {
            return res.status(400).json({ message: 'Required fields missing' });
        }

        if (!appliesToAll && (!books || books.length === 0)) {
            return res.status(400).json({ message: 'Please select at least one book for specific discount' });
        }

        const now = new Date();

        // Determine active status automatically if not provided
        let isActive;
        if (typeof active === 'boolean') {
            isActive = active;  // Use provided active value if exists
        } else {
            // Set active true only if now is between validFrom and validTo
            isActive = new Date(validFrom) <= now && now <= new Date(validTo);
        }

        const discountData = {
            code: code.toUpperCase().trim(),
            amount,
            validFrom,
            validTo,
            appliesToAll,
            books: appliesToAll ? [] : books,
            active: isActive,
        };

        const savedDiscount = await Discount.create(discountData);
        res.status(201).json(savedDiscount);
    } catch (error) {
        console.error('Discount creation error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}

export async function editDiscount(req, res) {

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

        await Discount.bulkWrite([
            {
                updateMany: {
                    filter: { validTo: { $lt: now }, active: true },
                    update: { $set: { active: false } },
                },
            },
            {
                updateMany: {
                    filter: { validFrom: { $lte: now }, validTo: { $gte: now }, active: false },
                    update: { $set: { active: true } },
                },
            },
            {
                updateMany: {
                    filter: { validFrom: { $gt: now }, active: true },
                    update: { $set: { active: false } },
                },
            }
        ]);

        // Fetch updated discounts
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

        if (typeof active !== 'boolean') {
            return res.status(400).json({ message: 'Active status must be a boolean' });
        }

        const now = new Date();

        //check if the discount exists and is within the valid time range
        const discount = await Discount.findOne({
            _id: id,
            validFrom: { $lte: now },
            validTo: { $gte: now },
        });

        if (!discount) {
            return res.status(404).json({ message: 'Discount not found or not currently valid' });
        }

        discount.active = active;
        await discount.save();

        const populatedDiscount = await discount.populate('books');

        res.status(200).json({ message: 'Discount status updated', discount: populatedDiscount });
    } catch (error) {
        console.error('Error updating discount status:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}


export async function deleteDiscount(req, res) {

    try {

        const id = req.params.id;
        console.log(id)

        if (!id) {
            return res.status(400).json({ message: 'Discount ID is required' });
        }

        const now = new Date();

        const discount = await Discount.findById(id);

        if (!discount) {
            return res.status(404).json({ message: 'Discount not found' });
        }

        // Check if discount is still valid (not expired)
        if (discount.validTo >= now) {
            return res.status(400).json({
                error: 'Cannot delete: Discount is still valid (not expired yet)',
            });
        }

        // Now it's expired, proceed to delete
        const deletedDiscount = await Discount.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Discount deleted successfully',
            deletedDiscount,
        });
    } catch (error) {
        console.error('Error deleting discount:', error.message);
        res.status(500).json({ message: 'Server error', error });
    }
}




export default {
    createDiscount,
    updateDiscountStatus,
    updateDiscountStatusById,
    editDiscount,
    getAllDiscounts,
    findDiscountByBookId,
    deleteDiscount
}