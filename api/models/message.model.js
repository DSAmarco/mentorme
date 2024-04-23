import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema({
    conversationId: {
        type: String,
        required: false,
    },
    userId: {
        type: String,
        required: false,
    },
    desc: {
        type: String,
        required: false,
    },
}, {
    timestamps: false
});

export default mongoose.model("Message", MessageSchema)