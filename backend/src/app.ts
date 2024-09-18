import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import connectDB from './config/db'; 
import equipmentRoutes from './routes/equipmentRoutes';
import userRoutes from './routes/authRoutes'; 

// Importar modelos
import User from './models/User'; 
import Equipment from './models/Equipment';

// Configurar dotenv
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
}));
app.use(express.json()); 

// Configurar multer para la subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Middleware para servir archivos estáticos (imágenes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/equipment', equipmentRoutes);
app.use('/api/users', userRoutes);

// Ruta para subir equipo con imagen
app.post('/api/equipment/upload', upload.single('image'), async (req: Request, res: Response) => {
  const { name, description, quantity, location, acquisitionDate } = req.body;
  const image = req.file?.filename;

  if (!name || !description || !quantity || !location || !acquisitionDate) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const newEquipment = new Equipment({
      name,
      description,
      quantity: Number(quantity),
      location,
      acquisitionDate: new Date(acquisitionDate),
      image: image || '',
    });
    await newEquipment.save();
    res.status(201).json(newEquipment);
  } catch (error) {
    console.error('Error al agregar equipo:', error);
    res.status(500).json({ error: 'Error al agregar equipo' });
  }
});

// Función para iniciar el servidor
const startServer = async (): Promise<void> => {
    try {
        // Conectar a la base de datos
        await connectDB(); 

        // Crear documentos de prueba
        await createTestData();

        // Iniciar el servidor
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
};

// Función para crear datos de prueba
const createTestData = async (): Promise<void> => {
    try {
        const existingUser = await User.findOne({ username: 'testuser' });
        if (!existingUser) {
            const testUser = new User({
                username: 'testuser',
                password: 'testpassword'
            });
            await testUser.save();
            console.log('Test user added');
        } else {
            console.log('Test user already exists');
        }

        const existingEquipment = await Equipment.findOne({ name: 'Test Equipment' });
        if (!existingEquipment) {
            const testEquipment = new Equipment({
                name: 'Test Equipment',
                description: 'Description of test equipment',
                quantity: 10,
                location: 'Test Location',
                acquisitionDate: new Date()
            });
            await testEquipment.save();
            console.log('Test equipment added');
        } else {
            console.log('Test equipment already exists');
        }
    } catch (error) {
        console.error('Failed to create test data:', error);
    }
};

// Iniciar el servidor
startServer();

// Exportar app como el export por defecto
export default app;
