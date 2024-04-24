import mongoose from "mongoose";
const { Schema } = mongoose;

const ConversationSchema = new Schema(
    {
        id: {
            type: String,
            required: false,
            unique: false,
        },
        sellerId: {
            type: String,
            required: false,
        },
        buyerId: {
            type: String,
            required: false,
        },
        readBySeller: {
            type: Boolean,
            required: false,
        },
        readByBuyer: {
            type: Boolean,
            required: false,
        },
        lastMessage: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: false,
    }
);

export default mongoose.model("Conversation", ConversationSchema);