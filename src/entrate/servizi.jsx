import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Pagina from '../pagine/Servizi.jsx';
import '../index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Pagina />
  </StrictMode>
);
