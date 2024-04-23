import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderSchema = new Schema({
    gigId: {
        type: String,
        required: false,
    },
    img: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    sellerId: {
        type: String,
        required: false,
    },
    sellerUsername: {
        type: String,
        required: false,
    },
    buyerId: {
        type: String,
        required: false,
    },
    buyerUsername: {
        type: String,
        required: false,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    isFinished: {
        type: Boolean,
        default: false,
    },
    payment_intent: {
        type: String,
        required: false,
    },
}, {
    timestamps: false
});

export default mongoose.model("Order", OrderSchema)