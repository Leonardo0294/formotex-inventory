import { Request, Response } from 'express';
import EquipmentService from '../services/EquipmentService';
import multer from 'multer';
import cloudinary from '../config/cloudinary';

// Configura multer para la carga de archivos
const upload = multer({ dest: 'uploads/' });

class EquipmentController {
    // Obtener todos los equipos
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

    // Agregar un nuevo equipo, incluyendo una imagen si está disponible
    async add(req: Request, res: Response): Promise<void> {
        try {
            const { name, description, quantity, location, acquisitionDate } = req.body;
            const imageFile = req.file; // Obtén el archivo de la imagen desde `req.file`

            if (!name || !description || !quantity || !location || !acquisitionDate) {
                res.status(400).json({ error: 'Faltan campos requeridos' });
                return;
            }

            let imageUrl: string = ''; // URL de la imagen

            if (imageFile) {
                // Subir la imagen a Cloudinary
                const result = await cloudinary.uploader.upload(imageFile.path);
                imageUrl = result.secure_url;
            }

            // Llama al servicio para agregar el nuevo equipo, incluyendo la imagen
            await EquipmentService.add({ name, description, quantity, location, acquisitionDate, image: imageUrl });
            res.status(201).send('Equipment added');
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'An unexpected error occurred' });
            }
        }
    }

    // Actualizar un equipo existente
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

    // Eliminar un equipo
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
