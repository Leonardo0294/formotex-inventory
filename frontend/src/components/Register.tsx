import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'; // Asegúrate de que esta ruta sea correcta
import '../styles/Register.css';  // Importa el archivo CSS

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username,
        password,
      });
      console.log(response.data);
      navigate('/login'); // Redirige a la página de inicio de sesión
    } catch (error: any) {
      console.error('Error durante el registro:', error);
      setError(error.response?.data?.message || 'Error desconocido');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Registro de Usuario</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nombre de usuario"
            required
            className="register-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            className="register-input"
          />
          <button type="submit" className="register-button">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
