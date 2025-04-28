// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Contextos
import { UserProvider } from './context/userContext';
import { HistoryProvider } from './context/historyContext';

// Páginas
import Intro from './pages/Intro';
import CadastroPodologo from './pages/CadastroPodologo';
import LoginPodologo from './pages/LoginPodologo';
import PainelPodologo from './pages/PainelPodologo';
import HistoricoPodologo from './pages/HistoricoPodologo';
import FormularioPrescricaoPD from './pages/FormularioPrescricaoPD';
import Paciente from './pages/Paciente';
import Formulario from './pages/Formulario';

function App() {
  return (
    <UserProvider>
      <HistoryProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/CadastroPodologo" element={<CadastroPodologo />} />
            <Route path="/LoginPodologo" element={<LoginPodologo />} />
            <Route path="/PainelPodologo" element={<PainelPodologo />} />
            <Route path="/HistoricoPodologo" element={<HistoricoPodologo />} />
            <Route path="/FormularioPrescricaoPD" element={<FormularioPrescricaoPD />} />
            <Route path="/Paciente" element={<Paciente />} />
            <Route path="/Formulario" element={<Formulario />} />
            <Route path="*" element={<Intro />} /> {/* Rota fallback */}
          </Routes>
        </Router>
      </HistoryProvider>
    </UserProvider>
  );
}

export default App;
