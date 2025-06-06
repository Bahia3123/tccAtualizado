import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import '../componentes/css/LoginPodologo.css';

const Podologo = () => {
  const [form, setForm] = useState({
    email: '',
    ncc: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Obter setUser do contexto de forma segura
  const { setUser } = useUser() || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!form.email.includes('@') || !form.email.includes('.')) {
      setError('Por favor, insira um email válido');
      return false;
    }
    if (form.ncc.length < 3) {
      setError('O número de conselho deve ter pelo menos 3 caracteres');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verifica se setUser existe antes de continuar
    if (typeof setUser !== 'function') {
      setError('Erro no sistema. Por favor, recarregue a página.');
      console.error('setUser não é uma função. Contexto pode não estar configurado corretamente.');
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3001/LoginPodologo', form);
      
      if (response.status === 200) {
        // Garante que setUser existe antes de chamá-lo
        if (typeof setUser === 'function') {
          setUser({ 
            nome: response.data.nome,
            email: response.data.email,
            ncc: response.data.ncc,
            token: response.data.token // se aplicável
          });
          navigate('/PainelPodologo');
        } else {
          throw new Error('Função setUser não disponível');
        }
      } else {
        setError('Email ou número de classe inválidos.');
      }
    } catch (err) {
      console.error('Erro detalhado:', err);
      
      if (err.response) {
        setError(err.response.data.message || 'Credenciais inválidas');
      } else if (err.message.includes('setUser')) {
        setError('Erro no sistema. Por favor, contate o suporte.');
      } else {
        setError('Erro de conexão. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login Podólogo</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ncc">Número de Conselho de Classe:</label>
          <input
            type="text"
            id="ncc"
            name="ncc"
            value={form.ncc}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Entrar'}
        </button>

      </form>
    </div>
  );
};

export default Podologo;