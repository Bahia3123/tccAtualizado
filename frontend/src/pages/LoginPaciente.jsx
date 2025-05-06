import React, { useState } from 'react';
import axios from 'axios';
import '../componentes/css/LoginPaciente.css';
import { useNavigate } from 'react-router-dom';


const Paciente = () => {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const navigate = useNavigate();
  

  

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post('http://localhost:3001/LoginPaciente', {
      nome,
      cpf,
      dataNascimento
    });

    alert(`Paciente ${nome} cadastrado com sucesso!`);
    setNome('');
    setCpf('');
    setDataNascimento('');
    navigate('/PainelPodologo');
  } catch (error) {
    console.error('Erro ao cadastrar paciente:', error);
    alert('Erro ao cadastrar paciente. Tente novamente.');
  }
};


  return (
    <div className="form-container">
      <h2>Cadastro Paciente</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome Completo:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          required
          placeholder="Digite seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <label htmlFor="cpf">CPF:</label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          required
          placeholder="Digite o CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />

        <label htmlFor="data_nascimento">Data Nascimento:</label>
        <input
          type="date"
          id="data_nascimento"
          name="data_nascimento"
          required
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
        <button type="button" onClick={() => navigate('/')}>
          Alternar Acesso
        </button>
      </form>
    </div>
  );
};

export default Paciente;
