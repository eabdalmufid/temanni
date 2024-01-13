import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { family: 4, dbName: "frens"  });
        console.log('Database connected successfully');
    } catch (err) {
        console.log('Database failed to connect: ' + err.name);
    };
};

export default connectDB;