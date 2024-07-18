import mongoose from 'mongoose';

let isConnected = false; // Global variable to track the connection status

export async function connectDB() {
    if (isConnected) {
        console.log('Already connected to MongoDB');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });
        isConnected = true;
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
    }
}
