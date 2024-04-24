import mongoose from 'mongoose';
const { Schema } = mongoose;

const RateSchema = new Schema({
    id: {
        type: String,
        required: false,
    },
    userId: {
        type: String,
        required: false,
    },
    star: {
        type: Number,
        required: false,
        enum: [1, 2, 3, 4, 5]
    },

}, {
    timestamps: false
});

export default mongoose.model("Rate", RateSchema)