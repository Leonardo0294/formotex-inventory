import mongoose, { Document, Schema } from 'mongoose';

export interface Equipment extends Document {
    name: string;
    description: string;
    quantity: number;
    location: string;
    acquisitionDate: Date;
}

const EquipmentSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    location: { type: String, required: true },
    acquisitionDate: { type: Date, required: true }
});

export default mongoose.model<Equipment>('Equipment', EquipmentSchema);
