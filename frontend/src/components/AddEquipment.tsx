import React, { useState } from 'react';
import axios from 'axios';
import { useEquipment } from '../components/EquipmentContext';

const AddEquipment: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const [location, setLocation] = useState('');
  const [acquisitionDate, setAcquisitionDate] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const { addEquipment } = useEquipment(); // Usa el contexto

  // Maneja el cambio de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      // Crear una vista previa de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Maneja el envío del formulario
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

      // Agrega el equipo a la lista global
      addEquipment(response.data);

      // Limpia el formulario
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Equipment Name"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="Quantity"
        required
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        required
      />
      <input
        type="date"
        value={acquisitionDate}
        onChange={(e) => setAcquisitionDate(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
      {imagePreview && (
        <div>
          <img
            src={imagePreview as string}
            alt="Image preview"
            style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px' }}
          />
        </div>
      )}
      <button type="submit">Add Equipment</button>
    </form>
  );
};

export default AddEquipment;
