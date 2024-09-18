import { Router, Request, Response } from 'express';
import EquipmentController from '../controllers/equipmentController';
import multer from 'multer';
import cloudinary from '../config/cloudinary';

const router = Router();
const upload = multer({ dest: 'uploads/' }); 

// Rutas para el controlador de equipos
router.get('/equipment', EquipmentController.getAll);
router.post('/equipment', EquipmentController.add);
router.put('/equipment/:id', EquipmentController.update);
router.delete('/equipment/:id', EquipmentController.delete);

// Ruta para cargar una imagen y crear un equipo
router.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
  try {
    // Verifica si el archivo fue subido
    if (!req.file) {
      return res.status(400).json({ error: 'No se ha subido ninguna imagen' });
    }

    // Subir la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // El resultado contiene el URL de la imagen
    const imageUrl = result.secure_url;

    // Crear un nuevo equipo con la URL de la imagen
    const newEquipment = {
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      location: req.body.location,
      acquisitionDate: req.body.acquisitionDate,
      image: imageUrl,
    };

    // Llamar al método `add` del controlador para agregar el equipo a la base de datos
    // Nota: El método `add` debe manejar la solicitud y respuesta directamente
    // en lugar de recibir un objeto `newEquipment`
    await EquipmentController.add(req, res);

  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send('Error uploading image');
  }
});

export default router;
