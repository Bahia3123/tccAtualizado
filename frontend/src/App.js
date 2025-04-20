// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/userContext';
import { HistoryProvider } from './context/historyContext';

// Importação de páginas
import Intro from './pages/Intro';
import Formulario from './pages/Formulario';
import LoginPodologo from './pages/LoginPodologo';
import Paciente from './pages/Paciente';
import HistoricoPodologo from './pages/HistoricoPodologo';
import CadastroPodologo from './pages/CadastroPodologo';
import PainelPodologo from './pages/PainelPodologo';
import FormularioPrescricaoPD from './pages/FormularioPrescricaoPD';

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
            <Route path="*" element={<Intro />} />
          </Routes>
        </Router>
      </HistoryProvider>
    </UserProvider>
  );
}

export default App;