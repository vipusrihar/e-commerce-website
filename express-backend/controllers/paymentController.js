import Payment from '../models/Payment.js';

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get payment by ID with populated order info
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('order');
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all payments for a specific order
const getPaymentsByOrderId = async (req, res) => {
  try {
    const payments = await Payment.find({ order: req.params.orderId }).populate('order');
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update payment status (e.g. pending, completed, failed, refunded)
const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const validStatuses = ['pending', 'completed', 'failed', 'refunded'];

    if (!validStatuses.includes(paymentStatus)) {
      return res.status(400).json({ message: 'Invalid payment status' });
    }

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );

    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// // Delete payment by ID (optional)
// const deletePayment = async (req, res) => {
//   try {
//     const payment = await Payment.findByIdAndDelete(req.params.id);
//     if (!payment) return res.status(404).json({ message: 'Payment not found' });
//     res.status(200).json({ message: 'Payment deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export default {
  createPayment,
  getPaymentById,
  getPaymentsByOrderId,
  updatePaymentStatus,
  // deletePayment  
};
