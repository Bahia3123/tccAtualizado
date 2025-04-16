import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/userContext'; // 👈 importa o provider

import Intro from './pages/Intro'; 
import Formulario from './pages/Formulario'; 
import LoginPodologo from './pages/LoginPodologo';
import Paciente from './pages/paciente';
import HistoricoPodologo from './pages/HistoricoPodologo';
import CadastroPodologo from './pages/CadastroPodologo';
import PainelPodologo from './pages/PainelPodologo';
import FormularioPrescricaoPD from './pages/FormularioPrescricaoPD';

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
          <Route path="/LoginPodologo" element={<LoginPodologo />} />
          <Route path="/Formulario" element={<Formulario />} />
          <Route path="/FormularioPrescricaoPD" element={<FormularioPrescricaoPD />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
