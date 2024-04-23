import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    gigId: {
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
    desc: {
        type: String,
        required: false,
    },
}, {
    timestamps: false
});

export default mongoose.model("Review", ReviewSchema)