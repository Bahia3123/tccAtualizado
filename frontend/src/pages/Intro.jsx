import React from 'react';
import './Intro.css';
import logo from '../assets/img/logo-curape.png';
import emailIcon from '../assets/img/images.png';
import facebookIcon from '../assets/img/facebook-logo.avif';
import youtubeIcon from '../assets/img/youtube-icon.png';
import instagramIcon from '../assets/img/instagram-logo.jpg';


const Intro = () => {
  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h1>Cura Pé</h1>
        </div>
        <div className="search-box">
          <input type="text" placeholder="Busque no site..." />
          <button>🔍</button>
        </div>
        <nav className="menu">
          <a href="#">Podologia</a>
          <a href="#">Serviços</a>
          <a href="#">Produtos</a>
          <a href="#">Home Care</a>
          <a href="#">Seja um Franqueado</a>
          <a href="#">Lojas</a>
          <a href="#">Papo de pé</a>
        </nav>
        <div className="social-icons">
          <br />
          <img src={emailIcon} alt="Email" />
          <br />
          <img src={facebookIcon} alt="Facebook" />
          <br />
          <img src={youtubeIcon} alt="YouTube" />
          <br />
          <img src={instagramIcon} alt="Instagram" />
        </div>
      </header>

      <main className="container">
        <h1>Bem-vindo ao Sistema de Podologia</h1>
        <p>Escolha uma das opções abaixo para continuar:</p>
        <div className="button-container">
          <a href="/paciente" target="_blank" rel="noopener noreferrer">
            Página do Paciente
          </a>
          <a href="/CadastroPodologo" target="_blank" rel="noopener noreferrer">
            Página do Doutor
          </a>
        </div>
      </main>

      <footer>
        <div className="footer_content">
          <div className="footer-left">
            <h4>Sobre Nós</h4>
            <p>
              Na Cura Pé, oferecemos cuidados especializados para a saúde dos seus pés. Nosso objetivo é promover o bem-estar e aliviar as dores relacionadas aos pés.
            </p>
          </div>
          <div className="footer-middle">
            <h4>Serviços</h4>
            <ul>
              <li><a href="/tratamentos">Tratamentos Podológicos</a></li><br />
              <li><a href="/prevenção">Prevenção de Problemas nos Pés</a></li><br />
              <li><a href="/consultas">Consultas de Avaliação</a></li><br />
              <li><a href="/cirurgia-podologia">Cirurgia Podológica</a></li><br />
            </ul>
          </div>
          <div className="footer-right">
            <h4>Contato</h4>
            <p>Telefone: (XX) XXXX-XXXX</p>
            <p>Email: contato@clinicapodologia.com</p>
            <p>Endereço: Rua Exemplo, 123, Cidade, Estado</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Cura Pé. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Intro;
