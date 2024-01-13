'use server'

import connectDB from '@/config/db'
import User from '@/models/userSchema';

export async function getUser(user_id) {

    if(!user_id) return null;

    try {
        await connectDB();
        const user = await User.findOne({ user_id }).select('user_id username profile sex status is_verified age title description contact tag created_at');
        return user;
    } catch (err) {
        console.log(err.message);
        return null;
    };

};