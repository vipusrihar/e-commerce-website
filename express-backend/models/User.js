import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is important'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is important'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        minlength: 8,
        select: false // optional for SSO users
    },
    asgardeoId: {
        type: String,
        unique: true,
        sparse: true
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String
    },
    phoneNo: {
        type: String,
        minlength: 10
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

export default User;
