import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { hash, compare } from 'bcryptjs';

import User from "../models/User.js";   
import Cart from "../models/Cart.js";   

export async function signup(req, res) {
  const { name, email, password, role, address } = req.body;
  try {
    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashed = await hash(password, 10);

    // Create new user
    const newUser = await User.create({ name, email, password: hashed, address, role });

    // Create empty cart for new user
    await Cart.create({ user: newUser._id, items: [] });

    res.status(201).json({ message: "User created", user: newUser });
  } catch (e) {
    console.error("Signup error:", e);
    res.status(500).json({ error: e.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    // Find user with password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: "No user found" });

    // Compare password
    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT token
    const token = sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export default {
  signup,
  login
};
