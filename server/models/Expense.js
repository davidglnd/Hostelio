import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    description: {
        type: String,
        required: false,
    },
    supplier:{
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    concept: {
        type: String,
        required: true,
    },
    idUser: {
        type: String,
        required: true,
    }
});

export default mongoose.model("Expense", userSchema);