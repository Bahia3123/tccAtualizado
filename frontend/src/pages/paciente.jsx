import React, { useState } from 'react';
import './paciente.css'; // ajuste conforme onde você colocar o CSS
import { useNavigate } from 'react-router-dom';

const Paciente = () => {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode fazer a requisição ao backend, ex:
    // axios.post('/api/pacientes', { nome, dataNascimento })

    alert(`Paciente ${nome} cadastrado com sucesso!`);
    setNome('');
    setDataNascimento('');
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
