import React, { useState } from 'react';
import '../componentes/css/Intro.css';
import logo from '../assets/img/logo-curape.png';
import img1 from '../assets/img/servicos-de-podologia-em-sorocaba.jpg.webp';
import img2 from '../assets/img/unha-encravada-em-sorocaba-feethouse-710x375.jpg';
import img3 from '../assets/img/Podoposturologia.jpg';
import img4 from '../assets/img/deformidades.jpg';
import img5 from '../assets/img/Atendimento domiciliar.jpg';
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
          Seu espaço dedicado ao cuidado dos seus pés com excelência e profissionais qualificados.
          Navegue pelo site e conheça nossos serviços, agende consultas e mantenha a saúde dos seus pés em dia!
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
              <h3>Cuidados Básicos com os Pés</h3>
              <p>
                Os cuidados básicos incluem o corte e lixamento das unhas, tratamento de calosidades e calos, além da hidratação e cuidados com a pele dos pés.
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
              <h3>Tratamento de Unhas Encravadas</h3>
              <p>
                As unhas encravadas podem ser extremamente dolorosas e, se não tratadas corretamente, podem levar a infecções.
                O podólogo é capacitado para remover unhas encravadas e aplicar técnicas que evitam a reincidência do problema.
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
              <h3>Podoposturologia</h3>
              <p>
                A podoposturologia envolve a avaliação da postura e da pisada, identificando problemas que podem afetar a saúde dos pés e do corpo.
                O podólogo prescreve palmilhas ortopédicas personalizadas para corrigir esses problemas.
                Este é um dos serviços de podologia que pode ajudar a melhorar a postura e a qualidade de vida.
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
              <h3>Correção de Deformidades</h3>
              <p>
                Deformidades como joanetes (hallux valgus) podem causar desconforto e dor.
                O podólogo trata essas condições e pode recomendar o uso de órteses para corrigir problemas posturais e deformidades.
              </p>
            </div>
          </article>

          <article className="image-block">
            <div className="image-placeholder" role="img" aria-label="Imagem Ilustrativa Consultas e Agenda">
              <img
                src={img5}
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
              <h3>Atendimento Domiciliar</h3>
              <p>
                Para pacientes com mobilidade reduzida ou idosos, o atendimento domiciliar é uma opção valiosa.
                O podólogo leva seus serviços até a residência do paciente, garantindo que todos recebam os cuidados necessários.
              </p>
            </div>
          </article>
        </section>
      </main>

      <footer>
        <div className="footer-text">
          <p>
            Os serviços de podologia são essenciais para a manutenção da saúde dos pés e, consequentemente, para a melhoria da qualidade de vida. <br />
            Ao procurar um podólogo, você garante que seus pés receberão o cuidado especializado de que necessitam, prevenindo problemas e tratando condições que podem afetar sua mobilidade e bem-estar. <br />
            Não deixe de incluir a visita ao podólogo em sua rotina de cuidados com a saúde.
          </p>
        </div>
        &copy; 2025 Podologia. Todos os direitos reservados.
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
