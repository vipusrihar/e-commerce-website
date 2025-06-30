const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Cart = require('../models/Cart');


exports.signup = async (req, res) => {
  const { name, email, password, role, address } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed, address, role });

    await Cart.create({ user: newUser._id, items: [] });

    res.status(201).json({ message: "User created", user: newUser });
  } catch (e) {
    console.error("Signup error:", e);
    res.status(500).json({ error: e.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with email:", email, "and password:", password );
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: "No user found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
