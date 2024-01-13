// Next Auth
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Cloudinary
import cloudinary from "@/config/cloudinary";
import { extractPublicId } from 'cloudinary-build-url'

// MongoDB
import connectDB from '@/config/db'
import User from '@/models/userSchema';

// NextJS
import { revalidatePath } from 'next/cache';

export async function GET(req) {
    
    // Check if user logged in
    const session = await getServerSession(authOptions);
    if (!session) return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });

    // Destructure queryParams
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const sex = parseInt(searchParams.get("s")) || 0;
    const tag = searchParams.get("t") || "";

    // Infinite Scroll
    const page = searchParams.get("page") || 1;
    const limit = searchParams.get("limit") || 30;
    const offset = (page - 1) * limit;

    try {
        await connectDB();
        
        const param = { status: 1 };
        if (query) param.title = { $regex: query, $options: 'i' };
        if (sex) param.sex = sex;
        if (tag) param.tag = tag;

        const users = await User.find(param).sort({ updated_at: -1 }).skip(offset).limit(limit);

        return Response.json({ success: true, message: "Users Found!", data: users }, { status: 200 });
    } catch (err) {
        console.log("Error: " + err);
        return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    };

};

export async function PATCH(req) {

    // Check if user logged in
    const session = await getServerSession(authOptions);
    if (!session) return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    const user_id = session?.user?.user_id;

    // Destructuring Data    
    let { username, sex, age, contact, tag, title, description, profile, status } = await req.json();

    // Validate Data
    if (
        typeof (username) !== 'string' || username.trim().length < 5 || username.length > 100
        || typeof (age) !== 'number' || age < 10 || age > 120
        || typeof (sex) !== 'number' || (sex !== 1 && sex !== 2)
        || typeof (contact) !== 'string' || contact.trim().length < 5 || contact.length > 100
        || typeof (tag) !== 'string' || tag.length < 1
        || typeof (title) !== 'string' || title.trim().length < 5 || title.length > 100
        || typeof (description) !== 'string' || description.trim().length < 5 || description.length > 1000
        || typeof (status) !== 'boolean'
        || typeof (profile) !== 'string'
    ) {
        return Response.json({ success: false, message: "Failed to Update", error: "Invalid Data" }, { status: 400 });
    };

    try {
        await connectDB();

        if (profile.trim() === "") {
            const prevUser = await User.findOne({ user_id }).select('profile');

            // Remove Old Profile
            if (prevUser?.profile?.includes("cloudinary")) {
                const publicId = extractPublicId(prevUser?.profile);
                await cloudinary.uploader.destroy(publicId, { invalidate: true });
            };

        } else if (/^(data:.*?;base64,)?([A-Za-z0-9+/]+={0,2})$/.test(profile)) {
            const prevUser = await User.findOne({ user_id }).select('profile');

            // Remove Old Profile
            if (prevUser?.profile?.includes("cloudinary")) {
                const publicId = extractPublicId(prevUser?.profile);
                await cloudinary.uploader.destroy(publicId, { invalidate: true });
            };

            // Insert New One
            const result = await cloudinary.uploader.upload(profile, {
                folder: "/profileTemanni",
                use_asset_folder_as_public_id_prefix: true,
                allowed_formats: ['png', 'jpg', 'jpeg', 'webp'],
            });

            // Store Link
            profile = result.secure_url;
        };

        const updatedUser = {
            username,
            age,
            sex,
            contact,
            tag,
            title,
            description,
            profile,
            status,
        };

        await User.updateOne({ user_id }, updatedUser);

        revalidatePath(`/user/${user_id}`);

        return Response.json({ success: true, message: "Update Successfully!" }, { status: 200 });
    } catch (err) {
        console.log("Error: " + err);
        return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    };

};