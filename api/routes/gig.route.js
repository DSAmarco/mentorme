import mongoose from 'mongoose';
const { Schema } = mongoose;

const GigSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    totalStars: {
        type: Number,
        default: 0,
    },
    starNumber: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    cat: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    img: {
        type: [String],
        required: false,
    },
    shortTitle: {
        type: String,
        required: true,
    },
    shortDesc: {
        type: String,
        required: true,
    },
    deliveryTime: {
        type: Number,
        required: true,
    },
    revisionNumber: {
        type: Number,
        required: true,
    },
    features: {
        type: [String],
        required: false,
    },
    sales: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true
});

export default mongoose.model("Gig", GigSchema)