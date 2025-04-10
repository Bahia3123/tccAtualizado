import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/userContext'; // 👈 importa o provider

import Intro from './pages/Intro';
import Paciente from './pages/paciente';
import HistoricoPodologo from './pages/HistoricoPodologo';
import CadastroPodologo from './pages/CadastroPodologo';
import PainelPodologo from './pages/PainelPodologo';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/CadastroPodologo" element={<CadastroPodologo/>} />
          <Route path="/paciente" element={<Paciente />} />
          <Route path="/PainelPodologo" element={<PainelPodologo />} />
          <Route path="/HistoricoPodologo" element={<HistoricoPodologo />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
