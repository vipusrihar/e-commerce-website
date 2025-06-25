const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Route imports
app.use("/api/auth", require("./routes/auth"));

const auth = require("./middleware/auth");
app.get("/api/protected", auth, (req, res) => {
  res.json({ message: "This is protected data.", user: req.user });
});


const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const cartRoutes = require('./routes/cartRoutes');
app.use('/api/users/:userId/cart', cartRoutes); 

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders',orderRoutes);





const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api/reviews', reviewRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// app.get('/api/testdb', async (req, res) => {
//   try {
//     // Try a simple query
//     const usersCount = await User.countDocuments();
//     res.status(200).json({
//       status: 'success',
//       message: 'Database connection successful',
//       usersCount,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: 'error',
//       message: 'Database connection failed',
//       error: err.message,
//     });
//   }
// });