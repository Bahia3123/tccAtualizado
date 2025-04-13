import { useState } from "react";
import { useUser } from '../context/userContext';  // Hook para acessar os dados do contexto
import { Link, useLocation } from "react-router-dom";
import './HistoricoPodologo.css';
import logo from "../assets/img/logo-curape.png";

export default function HistoricoUniversal() {
  const [activeTab, setActiveTab] = useState("patients");

  const location = useLocation();
  const { userData } = useUser(); // Hook para acessar os dados do formulário no contexto

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    alert("Funcionalidade será implementada na versão final do sistema");
  };

  // Função para verificar se a rota é a atual
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div>
      <header>
        <div className="container header-content">
          <div className="logo">
            <img src={logo} alt="logo" />
            <h1>CuraPé</h1>
          </div>
          <div className="user-menu">
            <div className="user-info">
              {userData?.nome ? `Dr(a). ${userData.nome}` : "Usuário"}
              <div className="user-role">Podólogo</div>
            </div>
            <div className="user-avatar">CS</div>
          </div>
        </div>
      </header>

      <div className="dashboard container">
        <aside className="sidebar">
          <nav>
            <Link to="/PainelPodologo" className={`nav-item ${isActive('/PainelPodologo')}`}>
              <span className="icon">🏠</span>
              <span>Home</span>
            </Link>

            <Link to="/HistoricoPodologo" className={`nav-item ${isActive('/HistoricoPodologo')}`}>
              <span className="icon">📁</span>
              <span>Histórico</span>
            </Link>

            <Link to="/paciente" className={`nav-item ${isActive('/paciente')}`}>
              <span className="icon">👥</span>
              <span>Pacientes</span>
            </Link>
          </nav>
        </aside>

        <main className="main-content">
          <div className="page-header">
            <h2 className="page-title">Histórico Universal</h2>
            <button className="btn" onClick={handleButtonClick}>
              ⬇ Exportar
            </button>
          </div>

          <div className="search-filter">
            <input
              type="text"
              className="search-input"
              placeholder="Pesquisar paciente..."
            />
            <select className="filter-select">
              <option>Todos os pacientes</option>
              <option>Pacientes ativos</option>
              <option>Últimos 30 dias</option>
              <option>Últimos 6 meses</option>
              <option>Último ano</option>
            </select>
            <select className="filter-select">
              <option>Todos os tipos</option>
              <option>Consulta</option>
              <option>Exame</option>
              <option>Procedimento</option>
              <option>Retorno</option>
            </select>
          </div>

          <div className="history-tabs">
            {["patients", "consultations", "prescriptions"].map((tab) => (
              <div
                key={tab}
                className={`tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => handleTabClick(tab)}
              >
                {tab === "patients" && "Pacientes"}
                {tab === "consultations" && "Atendimentos"}
                {tab === "prescriptions" && "Prescrições"}
              </div>
            ))}
          </div>

          <div className="history-content active">
            {/* Exibindo dados do formulário na aba de "Pacientes" */}
            {activeTab === "patients" && (
              <div className="patient-details">
                <h3>Informações do Paciente</h3>
                <p><strong>Nome:</strong> {userData.nome}</p>
                <p><strong>CPF/RG:</strong> {userData.cpf_rg}</p>
                <p><strong>Data de Nascimento:</strong> {userData.data_nascimento}</p>
                <p><strong>Queixa Principal:</strong> {userData.queixa_principal}</p>
                <p><strong>Doença Crônica:</strong> {userData.doenca_cronica}</p>
                <p><strong>Alergia:</strong> {userData.alergia}</p>
                <p><strong>Medicamento em Uso:</strong> {userData.medicamento}</p>
                <p><strong>Telefone:</strong> {userData.telefone}</p>
                <p><strong>E-mail:</strong> {userData.email}</p>
              </div>
            )}
            {/* Aqui você pode adicionar o conteúdo para as outras abas, como Atendimentos e Prescrições */}
          </div>
        </main>
      </div>
    </div>
  );
}
