import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'; // Asegúrate de que esta ruta sea correcta

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Enviar datos al backend para registrar el usuario
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username,
        password,
      });
      console.log(response.data);
      // Si la respuesta es exitosa, redirigir al usuario a la página de inicio de sesión o cualquier otra página
      navigate('/login'); // Redirige a la página de inicio de sesión
    } catch (error: any) {
      // Manejar errores
      console.error('Error durante el registro:', error);
      setError(error.response?.data?.message || 'Error desconocido');
    }
  };

  return (
    <div className="register-container">
      <h2>Registro de Usuario</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de usuario"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
