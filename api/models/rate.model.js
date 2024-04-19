import mongoose from 'mongoose';
const { Schema } = mongoose;

const RateSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    star: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5]
    },

}, {
    timestamps: true
});

export default mongoose.model("Rate", RateSchema)