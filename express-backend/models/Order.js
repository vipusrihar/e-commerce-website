import mongoose from 'mongoose';


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Order must belong to a user']
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem'
    }],
    totalPrice: {
        type: Number,
        required: [true, 'Oreder must have total price']
    },
    phoneNo: {
        type: Number,
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    orderStatus: {
        type: String,
        enum: ['processing', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'processing'
    },
    orderdAt: {
        type: Date,
        default: Date.now,
    }
})

const Order = mongoose.model('Order', orderSchema);
export default Order;