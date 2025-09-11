import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });
import helmet from 'helmet';

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';


import authRoutes from './routes/auth.js';
import {auth} from './middleware/auth.js';

import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import discountRoutes from './routes/discountRouter.js';

connectDB();

const app = express();

app.use(cors());
app.use(helmet()); // Security headers
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.get('/api/protected', auth, (req, res) => {
  res.json({ message: 'This is protected data.', user: req.user });
});


app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users/:userId/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/discounts',discountRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
