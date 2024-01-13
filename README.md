# Temanni

Welcome to Temanni! This guide will help you set up the necessary environment variables for the application.

![Screenshot](https://raw.githubusercontent.com/ruuuruiya/temanni/main/public/assets/images/screenshot.png)

## Configuration

Create a `.env` file in the root directory of your project and add the following environment variables:

```dotenv
# MongoDB
MONGO_URI = "YOUR_MONGO_URI"

# Google OAuth
GOOGLE_CLIENT_ID = "YOUR_GOOGLE_ID"
GOOGLE_CLIENT_SECRET = "YOUR_GOOGLE_SECRET"

# NextAuth
NEXTAUTH_SECRET = "YOUR_RANDOM_SECRET"

# Cloudinary
CLOUDINARY_NAME = "YOUR_CLOUDINARY_NAME"
CLOUDINARY_APIKEY = "YOUR_CLOUDINARY_APIKEY"
CLOUDINARY_APISECRET = "YOUR_CLOUDINARY_APISECRET"

# Next.js API URL
NEXT_PUBLIC_API_URL = "http://localhost:3000"