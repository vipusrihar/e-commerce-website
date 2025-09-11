import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { hash, compare } from 'bcryptjs';
import User from "../models/User.js";
import Cart from "../models/Cart.js";

// Utility function to generate JWT
const generateToken = (user) => {
  return sign(
    { id: user._id, role: user.role || "user" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Manual signup (optional if you still want it)
export async function signup(req, res) {
  const { name, email, password, role, address } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed, address, role });

    // Create empty cart
    await Cart.create({ user: newUser._id, items: [] });

    res.status(201).json({ message: "User created", user: newUser });
  } catch (e) {
    console.error("Signup error:", e);
    res.status(500).json({ error: e.message });
  }
}

// Manual login (optional)
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

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000
    }).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// Asgardeo login
export async function asgardeoLogin(req, res) {
  console.info(req.body)
  try {
    const { email, name, sub } = req.body;

    console.info(email, ' ', name, '  ', sub)

    if (!email || !sub) {
      return res.status(400).json({ error: "Missing email or sub from Asgardeo" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, asgardeoId: sub });
      await user.save();

      await Cart.create({ user: user._id, items: [] });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error("Asgardeo login error:", err);
    res.status(500).json({ error: err.message });
  }
}


export default {
  signup,
  login,
  asgardeoLogin
};
