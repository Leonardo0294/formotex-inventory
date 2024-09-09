import React, { useState } from 'react';
import { addEquipment } from '../services/equipmentService';

const EquipmentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await addEquipment({ name, type });
    setName('');
    setType('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Equipment</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Type:
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </label>
      <button type="submit">Add</button>
    </form>
  );
};

export default EquipmentForm;
