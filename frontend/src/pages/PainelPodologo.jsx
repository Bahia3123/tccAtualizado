import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import axios from 'axios';
import '../componentes/css/PainelPodologo.css';;
import logo from '../assets/img/logo-curape.png';
import { useUser } from '../context/userContext';

const PainelPodologo = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/usuario'); 
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };
    
    fetchUser();
  }, [setUser]);

  return (
    <>
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <header>
          <div className="container header-content">
            <div className="logo">
              <img src={logo} alt="logo" />
              <h1>CuraPé</h1>
            </div>
            <div className="user-menu">
              <div className="user-info">
                <div className="user-name">
                  {user?.nome ? `Dr(a). ${user.nome}` : "Usuário"}
                </div>
                <div className="user-role">Podólogo</div>
              </div>
              <div className="user-avatar">
                {user?.nome
                  ? user.nome.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
                  : "??"}
              </div>
            </div>
          </div>
        </header>
      </motion.div>

      <div className="container">
        <div className="dashboard">
          <aside className="sidebar">
            <nav>
              <NavLink
                to="/PainelPodologo"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <svg className="icon" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span>Home</span>
              </NavLink>

              <NavLink
                to="/HistoricoPodologo"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <svg className="icon" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
                </svg>
                <span>Histórico</span>
              </NavLink>

              <div className="nav-item">
                <svg className="icon" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span>Pacientes</span>
              </div>
            </nav>
          </aside>

          <main className="main-content">
            {/* Welcome Banner */}
            <motion.div 
              className="welcome-banner"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Bem-vindo, {user?.nome ? `Dr(a). ${user.nome}` : "Dr(a)."}</h2>
              <p>Acompanhe seus pacientes e visualize todo o histórico de atendimentos realizados.</p>
            </motion.div>

            {/* Dashboard Cards */}
            <motion.div 
              className="actions-grid"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              {/* CARD 1 */}
              <motion.div 
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.1)" }}
                className="action-card"
                onClick={() => navigate('/Formulario')}
              >
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 15h-2v-2h2v2zm0-4h-2V8h2v6zm-1-9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                </svg>
                <h3>Novo Atendimento</h3>
                <p>Registre um novo atendimento</p>
              </motion.div>

              {/* CARD 2 */}
              <motion.div 
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.1)" }}
                className="action-card"
                onClick={() => navigate('/HistoricoPodologo')}
              >
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
                <h3>Histórico de Pacientes</h3>
                <p>Visualize o histórico completo de atendimentos</p>
              </motion.div>

              {/* CARD 3 */}
              <motion.div 
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.1)" }}
                className="action-card"
              >
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.1h-15V5h15v14.1zm0-16.1h-15c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2z" />
                </svg>
                <h3>Relatórios</h3>
                <p>Gere relatórios de atendimentos</p>
              </motion.div>
            </motion.div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PainelPodologo;
