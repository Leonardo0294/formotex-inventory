import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

const connectDB = async (): Promise<void> => {
    try {
        
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined');
        }
        
        await mongoose.connect(process.env.MONGO_URI); 
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;
