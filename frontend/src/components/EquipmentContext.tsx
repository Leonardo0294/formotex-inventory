// src/components/EquipmentContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Equipment {
  id: string; // Asegúrate de que el ID sea una cadena
  name: string;
  description: string;
  quantity: number;
  location: string;
  acquisitionDate: string;
  image?: string;
}

interface EquipmentContextType {
  equipmentList: Equipment[];
  fetchEquipment: () => void;
  addEquipment: (newEquipment: Equipment) => void;
  removeEquipment: (id: string) => void; // Método para eliminar equipos
}

const EquipmentContext = createContext<EquipmentContextType | undefined>(undefined);

export const EquipmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);

  const fetchEquipment = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/equipment');
      setEquipmentList(response.data);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    }
  };

  const addEquipment = async (newEquipment: Equipment) => {
    try {
      // Envía el equipo al servidor y recibe la respuesta con el equipo recién añadido
      const response = await axios.post('http://localhost:5000/api/equipment/upload', newEquipment);
      // Actualiza la lista de equipos con el nuevo equipo añadido
      setEquipmentList((prevList) => [...prevList, response.data]);
    } catch (error) {
      console.error('Error adding equipment:', error);
    }
  };

  const removeEquipment = async (id: string) => {
    try {
      // Envía una solicitud para eliminar el equipo por ID
      await axios.delete(`http://localhost:5000/api/equipment/${id}`);
      // Actualiza la lista de equipos eliminando el equipo por ID
      setEquipmentList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error removing equipment:', error);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  return (
    <EquipmentContext.Provider value={{ equipmentList, fetchEquipment, addEquipment, removeEquipment }}>
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipment = () => {
  const context = React.useContext(EquipmentContext);
  if (context === undefined) {
    throw new Error('useEquipment must be used within an EquipmentProvider');
  }
  return context;
};
