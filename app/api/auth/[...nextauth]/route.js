import connectDB from "@/config/db";
import User from "@/models/userSchema";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    session: {
        stratergy: "jwt", // Default JWT
        maxAge: 30 * 24 * 60 * 60, // 30 Days
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 30, // 30 days
    },
    pages: {
        signIn: '/login',
        signOut: '/',
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            try {
                // Check user availability
                await connectDB();
                const userExist = await User.findOne({ email: user.email });

                // Check If user exists, if not, insert new one
                if (userExist) {
                    return true;
                } else {
                    await User.create({
                        username: user.name,
                        email: user.email,
                        profile: user.image,
                    });
                    return true;
                };

            } catch (err) {
                console.error('Something went wrong in storing user: ', err);
                return false;
            };
        },
        async jwt({ token, user, account, profile, isNewUser }) {

            if (account) {
                try {
                    await connectDB();

                    // Fetch Needed Data From DB to be on JWT based on email (user.email)
                    const userDB = await User.findOne({ email: user.email });
                    
                    // Put Data Inside Token to be accessible by session
                    token.user_id = userDB.user_id;
                    
                } catch (err) {
                    console.log("Something Went Wrong! - JWT Parts");
                };
            };

            return token;
        },
        async session({ session, token, user }) {

            // Remove default session name, email, and image from Google - Put all Data Provided in Token
            session.user = {};
            session.user.user_id = token.user_id;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };