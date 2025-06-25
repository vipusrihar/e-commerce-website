const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart');

//get all Users (admin only)
exports.findAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//get one user
exports.findUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        const cart = await Cart.findOne({ user: user._id }).populate('items');
                res.status(200).json({
            message: 'User fetched successfully',
            user: user,
            cart: cart
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.findUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



//update User
exports.updateUser = async (req, res) => {
    try {
        console.log(req.params.id)
        const updated = await User.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators : true
        });
        if(!updated) {
            return res.status(404).json({message: 'User Not Found'});
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({message : err.message});
    }
}


//delete User
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
