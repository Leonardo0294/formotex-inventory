import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AddEquipment from './components/AddEquipment';
import EquipmentList from './components/EquipmentList';
import Login from './components/Login';
import UpdateEquipment from './components/UpdateEquipment';
import Register from './components/Register';
import formotexBanner from './assets/computadora1.jpg';
import image1 from './assets/formotex-banner.jpg'; 
import image2 from './assets/formotex-banner.jpg';
import image3 from './assets/formotex-banner.jpg';

const App: React.FC = () => {
  // Simulate a function to handle log out
  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-logo">
            <Link to="/">Formotex Equipamientos</Link>
          </div>
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add">Add Equipment</Link></li>
            <li><Link to="/list">Equipment List</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/" onClick={handleLogout} className="navbar-link">Cerrar Sesión</Link></li>
          </ul>
        </nav>

        <div className="content-container">
          <Routes>
            <Route
              path="/"
              element={
                <div className="home">
                  <h1>Bienvenidos a Formotex Equipamientos</h1>
                  <img src={formotexBanner} alt="Formotex Equipamientos" className="banner-image" />
                  <div className="additional-images">
                    <img src={image1} alt="Additional 1" className="additional-image" />
                    <img src={image2} alt="Additional 2" className="additional-image" />
                    <img src={image3} alt="Additional 3" className="additional-image" />
                  </div>
                </div>
              }
            />
            <Route path="/add" element={<AddEquipment />} />
            <Route path="/list" element={<EquipmentList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/update/:id" element={<UpdateEquipment />} />
          </Routes>
        </div>

        <footer className="footer">
          <p>&copy; 2024 Formotex Equipamientos. Todos los derechos reservados.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
