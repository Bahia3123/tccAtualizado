import { useState } from "react";
import { useUser } from "../context/userContext";  // Usando useUser para acessar o contexto
import { useHistory } from "../context/historyContext";  // Mantendo o HistoryContext para o restante
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../componentes/css/HistoricoPodologo.css';
import logo from "../assets/img/logo-curape.png";

export default function HistoricoPodologo() {
  const [activeTab, setActiveTab] = useState("patients");
  const [expandedPatient, setExpandedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [showSuccess, setShowSuccess] = useState("");
  const { historico, inativarPaciente, excluirPaciente } = useHistory();
  const {user} = useUser();

  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return 0;
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;
    return idade;
  };

  const handleTabClick = (tabId) => setActiveTab(tabId);

  const toggleExpand = (cpf) => {
    setExpandedPatient(prev => prev === cpf ? null : cpf);
  };


  const handleInativarPaciente = (cpf) => {
    if (window.confirm('Tem certeza que deseja marcar este paciente como inativo?')) {
      inativarPaciente(cpf);
      setShowSuccess("Paciente marcado como inativo com sucesso!");
      setTimeout(() => setShowSuccess(""), 3000);
    }
  };

  const handleExcluirPaciente = (cpf) => {
    if (window.confirm('ATENÇÃO: Esta ação irá excluir PERMANENTEMENTE o paciente e todos seus dados. Tem certeza?')) {
      excluirPaciente(cpf);
      setShowSuccess("Paciente excluído permanentemente com sucesso!");
      setTimeout(() => setShowSuccess(""), 3000);
    }
  };

  const filteredPacientes = historico
    .filter(paciente =>
      (paciente.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.cpf_rg?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.telefone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "todos" ? true : paciente.status === filterStatus)
    )
    .sort((a, b) => {
      return sortOrder === "asc"
        ? a.nome.localeCompare(b.nome)
        : b.nome.localeCompare(a.nome);
    });

  const highlightText = (text) => {
    if (!text || !searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.toString().replace(regex, (match) => `<mark>${match}</mark>`);
  };

  const exportarParaPDF = () => {
    if (filteredPacientes.length === 0) {
      alert("Nenhum paciente para exportar!");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const imgWidth = 60;
    const imgHeight = 60;
    const imgX = (pageWidth - imgWidth) / 2;
    doc.addImage(logo, "PNG", imgX, 30, imgWidth, imgHeight);

    doc.setFontSize(24);
    doc.text("Histórico de Pacientes", pageWidth / 2, 110, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Emitido em: ${new Date().toLocaleString()}`, pageWidth / 2, 120, { align: "center" });
    doc.addPage();

    const tableColumn = [
      "Nome", "CPF/RG", "Nascimento", "Idade", "Telefone",
      "E-mail", "Status", "Cadastro"
    ];

    const tableRows = filteredPacientes.map(paciente => [
      paciente.nome,
      paciente.cpf_rg,
      paciente.data_nascimento,
      paciente.idade || calcularIdade(paciente.data_nascimento),
      paciente.telefone,
      paciente.email,
      paciente.status,
      paciente.dataHoraCadastro,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [41, 128, 185] },
      theme: "striped",
      margin: { left: 10, right: 10 },
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `CuraPé Podologia | Página ${i} de ${pageCount}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" }
      );
    }

    doc.save("historico_pacientes.pdf");
  };

  return (
     <div id="historico-principal">
    <div className="historico-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <header className="header-Historico" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
        
        <div className="header-content">
          <div className="header-left">
                      <img
                        src={logo}
                        alt=""
                        style={{
                          width: '65px',
                          height: '65px',
                          objectFit: 'cover',
                          borderRadius: '30px',
                        }}
                      />
                      <div className="logo" aria-label="Logo do site de Podologia">
                        CuraPé
                      </div>
                      
                    </div>

          <div className="user-menu">
            <div className="user-info">
              <div className="user-name">{user?.nome ? `Dr(a). ${user.nome}` : "Usuário"}</div>
              <div className="user-role">Podólogo</div>
            </div>
            <div className="user-avatar">
              {user?.nome ? user.nome.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "??"}
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard container">
        <motion.aside
          className="sidebar"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <nav>
             <NavLink
                to="/PainelPodologo"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                   <span className="icon">🏠</span>
                <span>Home</span>
              </NavLink>

              <NavLink
                to="/HistoricoPodologo"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <span className="icon">📁</span>
                <span>Histórico</span>
              </NavLink>

              <NavLink
                to="/PacienteList"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <span className="icon">👥</span>
                <span>Pacientes</span>
              </NavLink>

              <NavLink
                to="/FormularioPrescricaoPD"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <span className="icon">📄</span>
                <span>Prescrição</span>
              </NavLink>
          </nav>
        </motion.aside>

        <motion.main
          className="main-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {showSuccess && (
            <div className="success-message">
              {showSuccess}
            </div>
          )}

          <div className="page-header">
            <h2 className="page-title">Histórico Pacientes</h2>
            <button className="btn" onClick={exportarParaPDF}>⬇ Exportar PDF</button>
          </div>

          <div className="search-filter">
            <input
              type="text"
              className="search-input"
              placeholder="Pesquisar por nome, CPF, telefone ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="ativo">Ativos</option>
              <option value="inativo">Inativos</option>
            </select>
            <select
              className="filter-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ordenar A-Z</option>
              <option value="desc">Ordenar Z-A</option>
            </select>
          </div>

          <div className="history-tabs">
            {["patients", "prescriptions"].map((tab) => (
              <div
                key={tab}
                className={`tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => handleTabClick(tab)}
              >
                {tab === "patients" && "Pacientes"}
                {tab === "prescriptions" && "Prescrições"}
              </div>
            ))}
          </div>

          <div className="history-content">
            {activeTab === "patients" && filteredPacientes.length > 0 ? (
              filteredPacientes.map((paciente) => (
                <div
                  key={paciente.cpf_rg}
                  className={`patient-details-card ${expandedPatient === paciente.cpf_rg ? "expanded" : ""} ${paciente.status === 'inativo' ? 'inactive' : ''}`}
                >
                  <div className="card-header">
                    <h2 dangerouslySetInnerHTML={{ __html: highlightText(paciente.nome) }} />
                    {paciente.status === 'inativo' && <span className="inactive-badge">INATIVO</span>}
                    <div className="card-actions">
                      <button
                        className="expand-btn"
                        onClick={() => toggleExpand(paciente.cpf_rg)}
                      >
                        {expandedPatient === paciente.cpf_rg ? "Recolher ▲" : "Expandir ▼"}
                      </button>
                      {paciente.status === 'ativo' ? (
                        <button
                          className="inactive-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInativarPaciente(paciente.cpf_rg);
                          }}
                        >
                          Inativar
                        </button>
                      ) : (
                        <button
                          className="delete-permanent-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExcluirPaciente(paciente.cpf_rg);
                          }}
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedPatient === paciente.cpf_rg && (
                      <motion.div
                        className="patient-info-grid compact"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {Object.entries(paciente).map(([key, value]) => (
                          key !== "nome" && key !== "cpf_rg" && key !== "status" && (
                            <div className="patient-info-line" key={key}>
                              <strong>{key.replace(/_/g, " ")}:</strong> {value}
                            </div>
                          )
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <p>Nenhum paciente encontrado.</p>
            )}
          </div>
        </motion.main>
      </div>
    </div>
    </div>
  );
}
