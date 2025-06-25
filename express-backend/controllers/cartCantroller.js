const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');



// get cart by userId with populated items
exports.getCartByUserId = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId }).populate({
            path: 'items',
            populate: { path: 'book' }
        });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//add Product to Cart
exports.addProductCartByUserId = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        if (quantity === 0) {
            return res.status(400).json({ message: "Quantity must not be zero" });
        }

        // Find user's cart and populate items
        const cart = await Cart.findOne({ user: req.params.userId }).populate({
            path: 'items',
            populate: { path: 'book' } 
        });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        // Find if CartItem for product exists in cart
        let cartItem = cart.items.find(item => item.book?._id?.toString() === productId);

        if (cartItem) {
            // Update quantity
            cartItem.quantity += quantity;

            if (cartItem.quantity <= 0) {
                // Remove CartItem doc
                await CartItem.findByIdAndDelete(cartItem._id);
                // Remove reference from cart.items
                cart.items = cart.items.filter(item => item._id.toString() !== cartItem._id.toString());
            } else {
                // Save updated CartItem
                await cartItem.save();
            }
        } else {
            if (quantity > 0) {
                //create new CartItem
                cartItem = new CartItem({ book: productId, quantity });
                await cartItem.save();

                //add new item to cart
                cart.items.push(cartItem._id);
            } else {
                return res.status(400).json({ message: "Quantity must be greater than zero to add new product" });
            }
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};