import Equipment, { Equipment as IEquipment } from '../models/Equipment';

class EquipmentService {
    async getAll(): Promise<IEquipment[]> {
        try {
            return await Equipment.find().exec();
        } catch (error) {
            throw new Error('Error fetching equipment: ' + (error as Error).message);
        }
    }

    async add(newEquipment: Partial<IEquipment>): Promise<void> {
        try {
            const equipment = new Equipment(newEquipment);
            await equipment.save();
        } catch (error) {
            throw new Error('Error adding equipment: ' + (error as Error).message);
        }
    }

    async update(id: string, updatedData: Partial<IEquipment>): Promise<void> {
        try {
            await Equipment.findByIdAndUpdate(id, updatedData, { new: true }).exec();
        } catch (error) {
            throw new Error('Error updating equipment: ' + (error as Error).message);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await Equipment.findByIdAndDelete(id).exec();
        } catch (error) {
            throw new Error('Error deleting equipment: ' + (error as Error).message);
        }
    }
}

export default new EquipmentService();
