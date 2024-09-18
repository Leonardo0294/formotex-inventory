import React, { useState } from 'react';
import axios from 'axios';
import { useEquipment } from '../components/EquipmentContext';
import '../styles/AddEquipment.css';  // Importar el archivo CSS

const AddEquipment: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const [location, setLocation] = useState('');
  const [acquisitionDate, setAcquisitionDate] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const { addEquipment } = useEquipment(); // Usa el contexto

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('quantity', quantity.toString());
    formData.append('location', location);
    formData.append('acquisitionDate', acquisitionDate);

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/equipment/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      addEquipment(response.data);

      setName('');
      setDescription('');
      setQuantity(0);
      setLocation('');
      setAcquisitionDate('');
      setImage(null);
      setImagePreview(null);

      alert('Equipment added successfully');
    } catch (error) {
      console.error('Error adding equipment:', error);
      alert('Failed to add equipment');
    }
  };

  return (
    <div className="add-equipment-container">
      <div className="add-equipment-box">
        <h2>Agregar Equipo</h2>
        <form onSubmit={handleSubmit} className="add-equipment-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del Equipo"
            required
            className="add-equipment-input"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción"
            required
            className="add-equipment-input"
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Cantidad"
            required
            className="add-equipment-input"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ubicación"
            required
            className="add-equipment-input"
          />
          <input
            type="date"
            value={acquisitionDate}
            onChange={(e) => setAcquisitionDate(e.target.value)}
            required
            className="add-equipment-input"
          />
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="add-equipment-input"
          />
          {imagePreview && (
            <div>
              <img
                src={imagePreview as string}
                alt="Vista previa de la imagen"
                className="image-preview"
              />
            </div>
          )}
          <button type="submit" className="add-equipment-button">Agregar Equipo</button>
        </form>
      </div>
    </div>
  );
};

export default AddEquipment;
