// src/index.tsx o src/App.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { EquipmentProvider } from './components/EquipmentContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <EquipmentProvider>
      <App />
    </EquipmentProvider>
  </React.StrictMode>
);
