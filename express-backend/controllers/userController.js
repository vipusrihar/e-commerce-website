import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Cart from '../models/Cart.js';

// Get all users (admin only)
export async function findAllUsers(req, res) {
    try {
        const users = await User.find().select('-password');  // Use User model here
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get one user by ID
export async function findUserById(req, res) {
    try {
        const user = await User.findById(req.params.id).select('-password');  // Use User model here
        if (!user) return res.status(404).json({ message: 'User not found' });

        const cart = await Cart.findOne({ user: user._id }).populate('items');  // Use Cart model here
        res.status(200).json({
            message: 'User fetched successfully',
            user,
            cart
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get user by email
export async function findUserByEmail(req, res) {
    try {
        const user = await User.findOne({ email: req.params.email }).select('-password');  // Use User model here
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Update user
export async function updateUser(req, res) {
    try {
        const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updated) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Delete user
export async function deleteUser(req, res) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export default {
    findAllUsers,
    findUserById,
    findUserByEmail,
    updateUser,
    deleteUser
};
