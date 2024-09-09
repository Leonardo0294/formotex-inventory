import { Request, Response } from 'express';
import EquipmentService from '../services/EquipmentService';

class EquipmentController {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const equipmentList = await EquipmentService.getAll();
            res.json(equipmentList);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unexpected error occurred' });
            }
        }
    }

    async add(req: Request, res: Response): Promise<void> {
        try {
            const newEquipment = req.body;
            await EquipmentService.add(newEquipment);
            res.status(201).send('Equipment added');
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'An unexpected error occurred' });
            }
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            await EquipmentService.update(id, updatedData);
            res.send('Equipment updated');
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'An unexpected error occurred' });
            }
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await EquipmentService.delete(id);
            res.send('Equipment deleted');
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'An unexpected error occurred' });
            }
        }
    }
}

export default new EquipmentController();
