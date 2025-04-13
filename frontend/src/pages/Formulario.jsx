import React, { useState } from 'react';
import { useUser } from '../context/userContext';  // Usando o contexto para atualizar os dados
import './Formulario.css';

export default function Formulario() {
  const { setUserData } = useUser();  // Acessando a função para atualizar os dados no contexto

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Atualizando os dados no contexto com os dados preenchidos no formulário
    setUserData(formData);

    // Redireciona para a página de Histórico após enviar os dados
    window.open('../html/indicacaoTerapeutica.html', '_blank');
  };

  return (
    <main className="container formulario-medico">
      <h1 id="titulo">Formulário Médico</h1>
      <form onSubmit={handleSubmit}>
        {/* Dados Pessoais */}
        <fieldset>
          <legend>Dados Pessoais</legend>
          <label htmlFor="nome">Nome Completo:</label>
          <input type="text" id="nome" name="nome" required value={formData.nome} onChange={handleChange} />

          <label htmlFor="cpf_rg">CPF/RG:</label>
          <input type="text" id="cpf_rg" name="cpf_rg" required value={formData.cpf_rg} onChange={handleChange} />

          <label htmlFor="data_nascimento">Data de Nascimento:</label>
          <input type="date" id="data_nascimento" name="data_nascimento" required value={formData.data_nascimento} onChange={handleChange} />
        </fieldset>

        {/* Histórico Médico */}
        <fieldset>
          <legend>Histórico Médico</legend>
          <label htmlFor="queixa_principal">Queixa Principal:</label>
          <input type="text" id="queixa_principal" name="queixa_principal" value={formData.queixa_principal} onChange={handleChange} />

          <label htmlFor="doenca_cronica">Doença Crônica:</label>
          <input type="text" id="doenca_cronica" name="doenca_cronica" value={formData.doenca_cronica} onChange={handleChange} />

          <label htmlFor="alergia">Alergia:</label>
          <input type="text" id="alergia" name="alergia" value={formData.alergia} onChange={handleChange} />

          <label htmlFor="medicamento">Medicamento em Uso:</label>
          <input type="text" id="medicamento" name="medicamento" value={formData.medicamento} onChange={handleChange} />
        </fieldset>

        {/* Contato */}
        <fieldset>
          <legend>Contato</legend>
          <label htmlFor="telefone">Telefone:</label>
          <input type="tel" id="telefone" name="telefone" required value={formData.telefone} onChange={handleChange} />

          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
        </fieldset>

        {/* Botão de Envio */}
        <div className="form-actions">
          <button type="submit">Salvar</button>
        </div>
      </form>
    </main>
  );
}
