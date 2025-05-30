import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import axios from 'axios';
import '../componentes/css/PainelPodologo.css';
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
    <div id='principal-painel'>
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
         <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                
                <div className="container_header-content">
                  <div className="logo">
                    <img src={logo} alt="logo" />
                    <h1>CuraPé</h1>
                  </div>
                  <div className="user-menu">
                    <div className="user-info">
                      <div className="user-name">{user?.nome ? `Dr(a). ${user.nome}` : "Usuário"}</div>
                      <div className="user-role">Paciente</div>
                    </div>
                    <div className="user-avatar">
                      {user?.nome ? user.nome.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "??"}
                    </div>
                  </div>
                </div>
              </motion.header>
      </motion.div>

      <div className="container">
        <div className="dashboard">
          <aside className="sidebar">
            <nav>
              <NavLink
                to="/AcessoPaciente"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                   <span className="icon">🏠</span>
                <span>Home</span>
              </NavLink>

              <NavLink
                to="/"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <span className="icon">📁</span>
                <span>Histórico</span>
              </NavLink>

               <NavLink
                to="/Agendamento"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <span className="icon">📅</span>
                <span>Agendameto</span>
              </NavLink>

              
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
              <h2>Bem-vindo, {user?.nome ? `Paciente. ${user.nome}` : "Paciente."}</h2>
              <p>Acesse seu histórico médico completo e acompanhe todas as suas consultas em um só lugar.</p>
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
                onClick={() => navigate('/Agendamento')}
              >
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 15h-2v-2h2v2zm0-4h-2V8h2v6zm-1-9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                </svg>
                <h3>Agendar Consulta</h3>
                <p>Marque uma nova consulta com nossos especialistas</p>
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
                <h3>Histórico de Consultas</h3>
                <p>Visualize todas as suas consultas anteriores</p>
              </motion.div>

            </motion.div>
          </main>
        </div>
      </div>
      </div>
    </>
  );
};

export default PainelPodologo;
