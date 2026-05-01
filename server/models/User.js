import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    idUser: {
        type: String,
        default: () => crypto.randomUUID(),
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["basic", "business", "admin"],
        default: "basic",
    },
    lastName: {
        type: String,
        trim: true,
        lowercase: true,
        default: "",
    },
    businessName: {
        type: String,
        trim: true,
        lowercase: true,
        default: "",
    },
}, { timestamps: true });

userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model("User", userSchema);

export default User;