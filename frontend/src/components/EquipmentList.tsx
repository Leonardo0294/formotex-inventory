import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; 
import { useNavigate } from 'react-router-dom';
import '../styles/EquipmentList.css'; // Asegúrate de que esta ruta sea correcta

const EquipmentList: React.FC = () => {
  const [equipmentList, setEquipmentList] = useState<any[]>([]); // Estado para guardar la lista de equipos
  const navigate = useNavigate();

  useEffect(() => {
    // Función para cargar los equipos
    const fetchEquipment = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/equipment/equipment'); // Ruta para obtener equipos
        setEquipmentList(response.data); 
      } catch (error) {
        console.error('Error fetching equipment:', error);
        alert('Failed to fetch equipment');
      }
    };

    fetchEquipment();
  }, []);

  // Maneja la eliminación de un equipo
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/equipment/equipment/${id}`); // Elimina el equipo por ID
      setEquipmentList(equipmentList.filter(item => item.id !== id)); 
      alert('Equipment deleted successfully');
    } catch (error) {
      console.error('Error deleting equipment:', error);
      alert('Failed to delete equipment');
    }
  };

  // Maneja la edición de un equipo
  const handleEdit = (id: string) => {
    navigate(`/update/${id}`); // Navega a la página de edición
  };

  if (equipmentList.length === 0) {
    return <p className="no-equipment-message">No equipment available.</p>;
  }

  return (
    <div className="equipment-list-container">
      <h2>Equipment List</h2>
      <ul className="equipment-list">
        {equipmentList.map((item) => (
          <li key={item.id} className="equipment-item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Location: {item.location}</p>
            <p>Acquisition Date: {new Date(item.acquisitionDate).toLocaleDateString()}</p>
            {item.image && (
              <img
                src={item.image} // Usar la URL completa de la imagen
                alt={item.name}
              />
            )}
            <div className="button-group">
              <button onClick={() => handleEdit(item.id)} className="edit-button">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EquipmentList;
