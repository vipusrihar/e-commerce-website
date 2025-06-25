const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Book = require('../models/Book');

// Create a new Order
exports.createOrder = async (req, res) => {
  try {
    const { user, items, ...otherFields } = req.body;

    let totalPrice = 0;
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await Book.findById(item.book); // or Product if you're using a Product model
        if (!product) {
          throw new Error(`Product not found with ID ${item.book}`);
        }

        const orderItem = new OrderItem({
          product: item.book,
          quantity: item.quantity
        });

        await orderItem.save();
        totalPrice += product.price * item.quantity;

        return orderItem._id;
      })
    );

    const order = new Order({
      user,
      items: orderItems,
      totalPrice,
      ...otherFields
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// get all orders
exports.findAllOrders = async(req,res) => {
  try{
    const orders = await Order.find();
    res.status(200).json(orders);
  }catch{
    res.status(500).json({ message: err.message });
  }
}

// Get Order by ID with populated items and user
exports.findOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email') // populate user fields you want
      .populate({
        path: 'items',
        populate: { path: 'book' } // assuming OrderItem has product ref
      });

    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all Orders for a user
exports.findOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate('items')
      .populate('user', 'name email');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update order status by Order ID (e.g. shipped, delivered)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const validStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    await OrderItem.deleteMany({ _id: { $in: order.items } });
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Order and associated items deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
