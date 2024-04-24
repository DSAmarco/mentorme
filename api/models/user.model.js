import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: false,
        unique: false,
    },
    email: {
        type: String,
        required: false,
        unique: false,
    },
    password: {
        type: String,
        required: false,
    },
    img: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    desc: {
        type: String,
        required: false,
    },
    isSeller: {
        type: Boolean,
        default: false,
    },
    totalStars: {
        type: Number,
        default: 0,
    },
    starNumber: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: false
});

export default mongoose.model("User", userSchema)