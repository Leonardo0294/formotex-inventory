import axios from 'axios';
import { IEquipment } from '../interfaces/IEquipment';

const API_URL = 'http://localhost:5000/api/equipment'; // Asegúrate de que esta URL coincida con tu backend

export const fetchEquipment = async (): Promise<IEquipment[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addEquipment = async (equipment: Omit<IEquipment, 'id'>): Promise<void> => {
  await axios.post(API_URL, equipment);
};
