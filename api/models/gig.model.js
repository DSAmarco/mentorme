import mongoose from "mongoose";
const { Schema } = mongoose;

const GigSchema = new Schema(
    {
        userId: {
            type: String,
            required: false,
        },
        username: {
            type: String,
            required: false,
        },
        title: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        desc: {
            type: String,
            required: false,
        },
        totalStars: {
            type: Number,
            default: 0,
        },
        starNumber: {
            type: Number,
            default: 0,
        },
        cat: {
            type: String,
            required: false,
        },
        price: {
            type: Number,
            required: false,
        },
        cover: {
            type: String,
            required: false,
        },
        images: {
            type: [String],
            required: false,
        },
        shortTitle: {
            type: String,
            required: false,
        },
        shortDesc: {
            type: String,
            required: false,
        },
        deliveryTime: {
            type: Number,
            required: false,
        },
        revisionNumber: {
            type: Number,
            required: false,
        },
        features: {
            type: [String],
            required: false,
        },
        sales: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: false,
    }
);

export default mongoose.model("Gig", GigSchema);
