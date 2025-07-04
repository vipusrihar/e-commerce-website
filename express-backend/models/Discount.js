import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  validFrom: {
    type: Date,
    required: true,
  },
  validTo: {
    type: Date,
    required: true,
  },
  appliesToAll: {
    type: Boolean,
    default: false,
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  }],
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Discount = mongoose.model('Discount', discountSchema);
export default Discount

