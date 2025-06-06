import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // ⬅️ ADICIONADO
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
    const loadUserFromCookie = () => {
      const userCookie = Cookies.get('user');
      if (userCookie) {
        try {
          const userData = JSON.parse(userCookie);
          setUser(userData);
        } catch (err) {
          console.error("Erro ao ler cookie do usuário:", err);
        }
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/usuario');
        setUser(response.data);
        Cookies.set('user', JSON.stringify(response.data), { expires: 7 }); // ⬅️ SALVAR NO COOKIE
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        loadUserFromCookie(); // ⬅️ SE DER ERRO, TENTA PEGAR DO COOKIE
      }
    };

    fetchUser();
  }, [setUser]);

  return (
    <>
      <div id='principal-painel'>
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <motion.                                                                                                                              header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <div className="container_header-content">
              <div className="logo">
                <img src={logo} alt="logo" />
                <h1>CuraPé</h1>
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
          </motion.header>
        </motion.div>

       <div className="container">
        <div className="dashboard">
          <aside className="sidebar">
            <nav>
              <NavLink
                to="/PainelPodologo"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                   <span className="icon">🏠</span>
                <span>Home</span>
              </NavLink>

              <NavLink
                to="/Formulario"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                   <span className="icon">⚠️</span>
                <span>Atendimento</span>
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
                onClick={() => navigate('/PacienteList')}
              >
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
                <h3>Pacientes Atendidos</h3>
                <p>Visualize as informações completas de seus pacientes</p>
              </motion.div>

              {/* CARD 4 */}
              <motion.div 
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.1)" }}
                className="action-card"
                onClick={() => navigate('/FormularioPrescricaoPD')}
              >
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
                <h3>Formulário de Prescrição</h3>
                <p>Prescreva medicamentos pra seu paciente</p>
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
