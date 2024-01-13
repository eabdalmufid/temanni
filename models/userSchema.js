import { nanoid } from "@/lib/utils";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        index: true,
        default: () => nanoid(),
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    profile: {
        type: String,
        default: "",
    },
    sex: {
        type: Number,
        enum: [0, 1, 2], // 0(None), 1(Male), 2(Female)
        default: 0,
    },
    status: {
        type: Boolean,
        default: 0, // 0(Hidden), 1(Public)
    },
    is_verified: {
        type: Boolean,
        default: 0, // 0(Not Verified), 1(Verified)
    },
    age: {
        type: Number,
        default: 0,
    },
    title: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    },
    contact: {
        type: String,
        default: "",
    },
    tag: {
        type: String,
        default: "",
    },
}, {
    // Override default attribute name
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

const User = mongoose?.models?.User || mongoose.model('User', userSchema);

export default User;