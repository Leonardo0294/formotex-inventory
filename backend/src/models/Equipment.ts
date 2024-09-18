import mongoose, { Document, Schema } from 'mongoose';

// Define la interfaz del modelo Equipment
export interface Equipment extends Document {
    name: string;
    description: string;
    quantity: number;
    location: string;
    acquisitionDate: Date;
    image: string; // Agregamos el campo para la imagen
}

// Define el esquema del modelo Equipment
const EquipmentSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    location: { type: String, required: true },
    acquisitionDate: { type: Date, required: true },
    image: { type: String } 
});

// Exporta el modelo Equipment usando el esquema definido
export default mongoose.model<Equipment>('Equipment', EquipmentSchema);
