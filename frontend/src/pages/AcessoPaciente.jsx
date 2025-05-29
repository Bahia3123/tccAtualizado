// Arquivo: HistoricoConsultas.js
import React from 'react';
import '../componentes/css/PainelPodologo.css';
import logo from '../assets/img/logo-curape.png'; // ajuste o caminho se necessário

const HistoricoConsultas = () => {
  const handleHistoryClick = () => {
    alert('Redirecionando para o histórico de consultas...');
    // Exemplo: window.location.href = '/historico';
  };

  return (
    <div>
      <header>
        <div className="container_header-content">
          <div className="logo">
            <img src={logo} alt="logo" />
            <h1>CuraPé</h1>
          </div>
          <div className="user-menu">
            <div className="user-info">
              <div className="user-name">João Pedro</div>
            </div>
            <div className="user-avatar">JP</div>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="dashboard">
          <aside className="sidebar">
            <nav>
              <div className="nav-item active">
              <span className="icon">🏠</span>
                <span>Home</span>
              </div>

              <div className="nav-item">
              <span className="icon">📁</span>
                <span>Histórico</span>
              </div>

              <div className="nav-item">
              <span className="icon">👥</span>
                <span>Pacientes</span>
              </div>
            </nav>
          </aside>

          <main className="main-content">
            <div className="welcome-banner">
              <h2>Bem-vindo, João Pedro!</h2>
              <p>Acesse seu histórico médico completo e acompanhe todas as suas consultas em um só lugar.</p>
            </div>

            <div className="actions-grid">
              <div className="action-card">
                <svg className="icon" viewBox="0 0 24 24" style={{ width: 48, height: 48 }}>
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 18H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h1v1c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V5h1c.55 0 1 .45 1 1v14c0 .55-.45 1-1 1z" />
                </svg>
                <h3>Agendar Consulta</h3>
                <p>Marque uma nova consulta com nossos especialistas</p>
              </div>

              <div className="action-card" onClick={handleHistoryClick}>
                <svg className="icon" viewBox="0 0 24 24" style={{ width: 48, height: 48 }}>
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
                <h3>Histórico de Consultas</h3>
                <p>Visualize todas as suas consultas anteriores</p>
              </div>

              
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HistoricoConsultas;
