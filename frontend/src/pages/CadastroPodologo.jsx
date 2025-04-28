import React, { useState } from 'react';
import axios from 'axios';
import '../pages/cadastroPodologo.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';

function CadastroPodologo() {
  const [form, setForm] = useState({
    nome: '',
    ncc: '',
    consutorio: '',
    telefone: '',
    email: ''
  });

  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/CadastroPodologo', form);

      if (response.status === 200 || response.status === 201) {
        // Sucesso
        setUser({ nome: form.nome });
        navigate('/PainelPodologo');
      } else {
        // Resposta inesperada do servidor
        alert('Erro ao cadastrar. Por favor, tente novamente.');
      }
    } catch (err) {
      console.error('Erro no cadastro:', err);
      alert('Usuario já cadastrado!! Faça Login para continuar')
      navigate('/LoginPodologo')
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Podólogo(a)</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome Completo:</label>
        <input type="text" name="nome" required onChange={handleChange} />

        <label>N° Conselho de Classe:</label>
        <input type="text" name="ncc" required onChange={handleChange} />

        <label>Endereço do Consultório:</label>
        <input type="text" name="consultorio" required onChange={handleChange} />

        <label>Telefone:</label>
        <input type="text" name="telefone" required onChange={handleChange} />

        <label>E-mail:</label>
        <input type="email" name="email" required onChange={handleChange} />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroPodologo;
