import mongoose from 'mongoose';

const { connect, connection } = mongoose;
import { config } from 'dotenv';

config({ path: './config/config.env' });


console.log('DATABASE:', process.env.DATABASE);

const connectDB = async () => {
  try {
    await connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    console.error("MongoDB connection failed ❌", error.message);
    process.exit(1);
  }
};


connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});

connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Close the Mongoose connection when Node process ends
process.on('SIGINT', async () => {
  await connection.close();
  console.log('Mongoose connection closed due to app termination');
  process.exit(0);
});



export default connectDB;