import React, { useState } from 'react';
import { useHistory } from '../context/historyContext';
import { useNavigate } from 'react-router-dom';
import '../componentes/css/Formulario.css';

export default function Formulario() {
  const { adicionarPaciente } = useHistory();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    cpf_rg: '',
    data_nascimento: '',
    queixa_principal: '',
    doenca_cronica: '',
    alergia: '',
    medicamento: '',
    telefone: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return 0;
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica se os campos obrigatórios estão preenchidos
    if (!formData.nome || !formData.cpf_rg || !formData.data_nascimento || !formData.telefone) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    // Cria o objeto paciente completo
    const paciente = {
      ...formData,
      status: "ativo",
      idade: calcularIdade(formData.data_nascimento),
      dataHoraCadastro: new Date().toLocaleString(),
    };

    // Adiciona aos contextos
    adicionarPaciente(paciente);

    // Envia os dados para o backend
    fetch('http://localhost:3001/Paciente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paciente),
    })
      .then((response) => {
        if (response.ok) {
          alert('Paciente cadastrado com sucesso!');
          navigate('/HistoricoPodologo');
        } else {
          alert('Erro ao salvar paciente');
        }
      })
      .catch((error) => {
        console.error('Erro:', error);
        alert('Erro ao salvar paciente');
      });
  };

  return (
    <main className="container formulario-medico">
      <h1 id="titulo">Formulário Médico</h1>
      <form onSubmit={handleSubmit}>
        {/* Dados Pessoais */}
        <fieldset>
          <legend>Dados Pessoais</legend>
          <div className="form-group">
            <label htmlFor="nome">Nome Completo:*</label>
            <input 
              type="text" 
              id="nome" 
              name="nome" 
              required 
              value={formData.nome} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="cpf_rg">CPF/RG:*</label>
            <input 
              type="text" 
              id="cpf_rg" 
              name="cpf_rg" 
              required 
              value={formData.cpf_rg} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="data_nascimento">Data de Nascimento:*</label>
            <input 
              type="date" 
              id="data_nascimento" 
              name="data_nascimento" 
              required 
              value={formData.data_nascimento} 
              onChange={handleChange} 
            />
          </div>
        </fieldset>

        {/* Histórico Médico */}
        <fieldset>
          <legend>Histórico Médico</legend>
          <div className="form-group">
            <label htmlFor="queixa_principal">Queixa Principal:</label>
            <input 
              type="text" 
              id="queixa_principal" 
              name="queixa_principal" 
              value={formData.queixa_principal} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="doenca_cronica">Doença Crônica:</label>
            <input 
              type="text" 
              id="doenca_cronica" 
              name="doenca_cronica" 
              value={formData.doenca_cronica} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="alergia">Alergia:</label>
            <input 
              type="text" 
              id="alergia" 
              name="alergia" 
              value={formData.alergia} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="medicamento">Medicamento em Uso:</label>
            <input 
              type="text" 
              id="medicamento" 
              name="medicamento" 
              value={formData.medicamento} 
              onChange={handleChange} 
            />
          </div>
        </fieldset>

        {/* Contato */}
        <fieldset>
          <legend>Contato</legend>
          <div className="form-group">
            <label htmlFor="telefone">Telefone:*</label>
            <input 
              type="tel" 
              id="telefone" 
              name="telefone" 
              required 
              value={formData.telefone} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
            />
          </div>
        </fieldset>

        {/* Botão de Envio */}
        <div className="form-actions">
          <button type="submit">Salvar</button>
        </div>
      </form>
    </main>
  );
}
