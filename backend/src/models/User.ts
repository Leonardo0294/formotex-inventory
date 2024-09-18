import mongoose, { Document, Schema } from 'mongoose';

// Define la interfaz del modelo User
export interface User extends Document {
    username: string;
    password: string;
}

// Define el esquema del modelo User
const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Exporta el modelo User usando el esquema definido
export default mongoose.model<User>('User', UserSchema);
