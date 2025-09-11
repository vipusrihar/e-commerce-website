import CartItem from '../models/CartItem.js';
import Cart from '../models/Cart.js';


export async function getCartByUserId(req, res) {
    try {
        const cart = await Cart.findOne({ user: req.params.userId }).populate({
            path: 'items',
            populate: { path: 'book' }
        });

        if (!cart) {
            await Cart.create({ user: req.params.userId, items: [] });
        }
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// add Product to Cart
export async function addProductCartByUserId(req, res) {
    try {
        const { productId, quantity } = req.body;

        if (quantity === 0) {
            return res.status(400).json({ message: "Quantity must not be zero" });
        }

        const cart = await Cart.findOne({ user: req.params.userId }).populate({
            path: 'items',
            populate: { path: 'book' }
        });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        let cartItem = cart.items.find(item => item.book && item.book._id.toString() === productId);

        if (cartItem) {
            if (cartItem.quantity + quantity <= 0) {
                await CartItem.findByIdAndDelete(cartItem._id); // ✅ fixed
                cart.items = cart.items.filter(item => item._id.toString() !== cartItem._id.toString());
            } else {
                cartItem.quantity += quantity;
                await cartItem.save();
            }
        } else {
            if (quantity > 0) {
                cartItem = new CartItem({ book: productId, quantity });
                await cartItem.save();
                cart.items.push(cartItem._id);
            } else {
                return res.status(400).json({ message: "Quantity must be greater than zero to add new product" });
            }
        }

        await cart.save();

        const updatedCart = await Cart.findOne({ user: req.params.userId }).populate({
            path: 'items',
            populate: { path: 'book' }
        });

        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export async function clearAllProductsOfCart(req, res) {
    try {
        const { userId } = req.params;

        console.info("Received userId:", userId);

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found for the user" });
        }

        cart.items = [];
        await cart.save();

        console.info("Cart cleared:", cart);

        res.status(200).json({ message: "All products removed from cart successfully", cart });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({
            message: "Failed to clear the cart",
            error: error.message,
        });
    }
}



export default {
    getCartByUserId,
    addProductCartByUserId,
    clearAllProductsOfCart
};