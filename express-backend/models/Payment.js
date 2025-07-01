import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    paymentMethod: {
        type: String,
        required: [true, 'Please provide payment method'],
        enum: ['credit-card', 'paypal', 'cash-on-delivery'],
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending',
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true,
    }
})

const Payment = mongoose.model('Payment', paymentSchema);
export default  Payment