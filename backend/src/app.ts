import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import equipmentRoutes from './routes/equipmentRoutes';
import { connectDB } from './config/db';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api', equipmentRoutes);

connectDB(); // Connect to the database

export default app;
