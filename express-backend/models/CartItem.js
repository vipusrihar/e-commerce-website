import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    }
})


const CartItem = mongoose.model('CartItem', cartItemSchema);
export default CartItem

