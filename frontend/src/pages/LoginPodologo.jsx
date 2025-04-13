import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import './LoginPodologo.css';

const LoginPodologo = () => {
  const [form, setForm] = useState({
    email: '',
    ncc: ''
  });

  const navigate = useNavigate();
  const { setUser } = useUser(); // 👈 usamos o contexto

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
      const response = await axios.post('http://localhost:3001/LoginPodologo', form);

      if (response.status === 200) {
        setUser({ nome: response.data.nome }); // 👈 salvando o nome no contexto
        navigate('/PainelPodologo');
      } else {
        alert('Email ou número de classe inválidos.');
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      alert('Erro ao fazer login. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Número de Conselho de Classe:</label>
        <input
          type="text"
          name="ncc"
          value={form.ncc}
          onChange={handleChange}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPodologo;
