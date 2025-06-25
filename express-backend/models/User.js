const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is important'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email is important'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'password is imporant'],
        minlength: 8,
        select: false
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
    createdAt: {
        type: Date,
        default: Date.now
    }
},
);


const User = mongoose.model('User', userSchema);

module.exports = User;