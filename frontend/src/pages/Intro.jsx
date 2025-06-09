import React, { useState } from 'react';
import '../componentes/css/Intro.css';
import logo from '../assets/img/logo-curape.png';
import img1 from '../assets/img/Atendimento.png';
import img2 from '../assets/img/Historico.png';
import img3 from '../assets/img/Salvos.png';
import img4 from '../assets/img/Prescricao.png';
import Podologo from './LoginPodologo'



const PaginaInicial = () => {
  const [showPodologoModal, setShowPodologoModal] = useState(false);

  return (
    <div id='principal'>
      <div className='Main-header-conteiner'>
        <header>
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
            <div className="contact-info" aria-label="Informações de contato e redes sociais">
              <span>
                <a href="tel:+5511999999999" aria-label="Telefone">(11) 94002-8922</a>
              </span>
              <span> | </span>
              <a
                href="https://www.facebook.com/podologia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                Facebook
              </a>
              <span> | </span>
              <a
                href="https://www.instagram.com/podologia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <span> | </span>
              <a href="mailto:contato@podologia.com" aria-label="Enviar email">
                Fale Conosco
              </a>
            </div>
          </div>
          <nav className="login-container" aria-label="Área de Login">
            <h2>Login</h2>
           
            <a
              onClick={() => setShowPodologoModal(true)}
              className="login-btn"
              style={{ cursor: 'pointer' }}
            >
              Podólogo
            </a>
          </nav>
        </header>
      </div>

      <main>
        <h1>Bem-vindo à CuraPé</h1>
        <p className="intro">
          Apresentamos uma nova ferramenta desenvolvida especialmente para podólogos profissionais que desejam otimizar seu tempo e elevar a 
          eficiência de seus atendimentos. Com foco na agilidade, excelência e apoio de profissionais qualificados, nossa solução foi criada para
          transformar sua rotina. Explore nossos recursos, conheça nossos serviços e descubra como é possível atender com mais qualidade e menos esforço!
        </p>

        <section className="image-section" aria-label="Seção de imagens ilustrativas com descrições">
          <article className="image-block">
            <div className="image-placeholder" role="img" aria-label="Imagem Ilustrativa Cuidados Básicos">
              <img
                src={img1}
                alt="imagem"
                style={{
                  width: '95%',
                  height: '95%',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            </div>
            <div className="image-description">
              <h3> Realizar um novo atendimento</h3>
              <p>
              Inicie um novo atendimento de forma prática e organizada. Registre as informações do paciente, defina o procedimento e conte com o suporte da nossa 
              ferramenta para garantir um atendimento rápido, eficiente e com qualidade profissional.
              </p>
            </div>
          </article>

          <article className="image-block">
            <div className="image-placeholder" role="img" aria-label="Imagem Ilustrativa Tratamentos Personalizados">
              <img
                src={img2}
                alt="imagem"
                style={{
                  width: '95%',
                  height: '95%',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            </div>
            <div className="image-description">
              <h3>Historico de pacientes</h3>
              <p>
              Acesse de forma rápida e segura todos os atendimentos anteriores de seus pacientes. Visualize procedimentos realizados, 
               e as evoluções dos tratamentos facilitando um acompanhamento completo e personalizado.
              </p>
            </div>
          </article>

          <article className="image-block">
            <div className="image-placeholder" role="img" aria-label="Imagem Ilustrativa Tratamentos Personalizados">
              <img
                src={img3}
                alt="imagem"
                style={{
                  width: '95%',
                  height: '95%',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            </div>
            <div className="image-description">
              <h3>Informações para contato</h3>
              <p>
              Tenha fácil acesso aos dados de contato dos seus pacientes, como telefone, e-mail e endereço. Mantenha a comunicação 
              organizada e facilite o acompanhamento entre atendimentos.
              </p>
            </div>
          </article>

          <article className="image-block">
            <div className="image-placeholder" role="img" aria-label="Imagem Ilustrativa Consultas e Agenda">
              <img
                src={img4}
                alt="imagem"
                style={{
                  width: '95%',
                  height: '95%',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            </div>
            <div className="image-description">
              <h3>Formulário de prescrição</h3>
              <p>
              Registre e personalize prescrições de forma prática e segura. Com campos específicos para orientações, produtos e dosagens,
              o formulário facilita a emissão de prescrições claras e profissionais para seus pacientes.
              </p>
            </div>
          </article>

         
        </section>
      </main>

      <footer>
        <div className="footer-text">
          <p>
          Sabemos que os serviços de podologia são fundamentais para a saúde dos pés e para a qualidade de vida dos pacientes. Pensando nisso, 
          desenvolvemos uma ferramenta inovadora que auxilia podólogos a otimizarem seu tempo nos atendimentos, sem abrir mão da excelência no cuidado. 
          Com recursos que agilizam o processo clínico e organizam as informações com eficiência, você poderá focar ainda mais no que realmente importa: 
          oferecer um atendimento de qualidade e promover o bem-estar dos seus pacientes.
          </p>
        </div>
        &copy; CuraPé 2025. Atenda com mais qualidade e menos esforço!
      </footer>

      {/* Modal Paciente */}
    

      {/* Modal Podólogo - Substitua pelo componente real depois */}
      {showPodologoModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setShowPodologoModal(false)} className="close-btn">X</button>
            <Podologo/>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginaInicial;