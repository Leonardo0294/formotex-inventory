import React, { useEffect, useState } from 'react';
import { fetchEquipment } from '../services/equipmentService';
import { IEquipment } from '../interfaces/IEquipment';

const EquipmentList: React.FC = () => {
  const [equipment, setEquipment] = useState<IEquipment[]>([]);

  useEffect(() => {
    const getEquipment = async () => {
      const data = await fetchEquipment();
      setEquipment(data);
    };
    getEquipment();
  }, []);

  return (
    <div>
      <h2>Equipment List</h2>
      <ul>
        {equipment.map((item) => (
          <li key={item.id}>{item.name} - {item.type}</li>
        ))}
      </ul>
    </div>
  );
};

export default EquipmentList;
