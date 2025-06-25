const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    quantity: {
        type: Number
    }
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = OrderItem