import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/UpdateEquipment.css'; // Importar el archivo de estilos

const UpdateEquipment: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState('');
  const [acquisitionDate, setAcquisitionDate] = useState('');

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/equipment/${id}`);
        const { name, description, quantity, location, acquisitionDate } = response.data;

        setName(name);
        setDescription(description);
        setQuantity(quantity);
        setLocation(location);
        setAcquisitionDate(new Date(acquisitionDate).toISOString().split('T')[0]);
      } catch (error) {
        console.error('Error fetching equipment data:', error);
        alert('Error fetching equipment details');
      }
    };

    fetchEquipment();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/equipment/${id}`, {
        name,
        description,
        quantity,
        location,
        acquisitionDate,
      });
      alert('Equipment updated successfully');
      navigate('/equipment');
    } catch (error) {
      console.error('Error updating equipment:', error);
      alert('Failed to update equipment');
    }
  };

  return (
    <form className="update-form" onSubmit={handleSubmit}>
      <h2>Update Equipment</h2>
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
      <button type="submit">Update Equipment</button>
    </form>
  );
};

export default UpdateEquipment;
