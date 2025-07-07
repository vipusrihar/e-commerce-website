import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Book from '../models/Book.js'
import Cart from '../models/Cart.js';

// Create a new Order
export async function createOrder(req, res) {

  try {
    const { user, items, ...otherFields } = req.body;

    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Book.findById(item.book); // No session
      if (!product) {
        throw new Error(`Product not found with ID ${item.book}`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for "${product.title}"`);
      }

      // Reduce stock
      product.stock -= item.quantity;
      await product.save(); 

      const orderItem = new OrderItem({ product: item.book, quantity: item.quantity });
      await orderItem.save();
      totalPrice += product.price * item.quantity;
      orderItems.push(orderItem._id);
    }

    // Create the order
    const order = new Order({ user, items: orderItems, totalPrice, ...otherFields });
    await order.save(); 

    // clear the cart for the user
    const cart = await Cart.findOne({ user }); 
    if (cart) {
      cart.items = [];
      await cart.save(); 
    }

    res.status(201).json(order);
  } catch (err) {

    res.status(400).json({ message: err.message });
  }
}

// get all orders
export async function findAllOrders(req, res) {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
}

// Get Order by ID with populated items and user
export async function findOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email') 
      .populate({
        path: 'items',
        populate: { path: 'book' } 
      });

    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get all Orders for a useru
export async function findOrdersByUser(req, res) {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate('items')
      .populate('user', 'name email');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update order status by Order ID (e.g. shipped, delivered)
export async function updateOrderStatus(req, res) {
  console.log(req.body)
  try {
    const { orderStatus } = req.body;
    const validStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }

    const order = await Order.findByIdAndUpdate( // <-- use Order here
      req.params.id,
      { orderStatus },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Delete order by ID
export async function deleteOrder(req, res) {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    await OrderItem.deleteMany({ _id: { $in: order.items } }); // ✅ fixed
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Order and associated items deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}



export async function countOrders(req, res) {
  try {
    const count = await Order.countDocuments();
    console.log("Order", count)
    res.status(200).json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to count orders' });
  }
};


export default {
  createOrder,
  findAllOrders,
  findOrderById,
  findOrdersByUser,
  updateOrderStatus,
  deleteOrder,
  countOrders
};