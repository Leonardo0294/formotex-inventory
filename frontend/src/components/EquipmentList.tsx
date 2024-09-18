import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; 
import { useNavigate } from 'react-router-dom';

const EquipmentList: React.FC = () => {
  const [equipmentList, setEquipmentList] = useState<any[]>([]); // Estado para guardar la lista de equipos
  const navigate = useNavigate();

  useEffect(() => {
    // Función para cargar los equipos
    const fetchEquipment = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/equipment/equipment'); // Ruta para obtener equipos
        setEquipmentList(response.data); // Guardar los equipos en el estado
      } catch (error) {
        console.error('Error fetching equipment:', error);
        alert('Failed to fetch equipment');
      }
    };

    fetchEquipment();
  }, []); // Vacío para ejecutar solo una vez cuando el componente se monta

  // Maneja la eliminación de un equipo
  const handleDelete = async (id: string) => {
    try {
      // Asegúrate de que la ruta coincide con la del backend
      await axios.delete(`http://localhost:5000/api/equipment/equipment/:id`); // Elimina el equipo por ID
      setEquipmentList(equipmentList.filter(item => item.id !== id)); // Actualiza la lista en el estado
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
    return <p>No equipment available.</p>;
  }

  return (
    <div>
      <h2>Equipment List</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {equipmentList.map((item) => (
          <li key={item.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Location: {item.location}</p>
            <p>Acquisition Date: {new Date(item.acquisitionDate).toLocaleDateString()}</p>
            {item.image && (
              <img
                src={item.image} // Usar la URL completa de la imagen
                alt={item.name}
                style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px', borderRadius: '8px' }}
              />
            )}
            <div style={{ marginTop: '10px' }}>
              <button onClick={() => handleEdit(item.id)} style={{ marginRight: '10px' }}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EquipmentList;
