// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AddEquipment from './components/AddEquipment';
import EquipmentList from './components/EquipmentList';
import Login from './components/Login';
import UpdateEquipment from './components/UpdateEquipment';
import Register from './components/Register';
import formotexBanner from './assets/formotex-banner.jpg';

const App: React.FC = () => {
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
