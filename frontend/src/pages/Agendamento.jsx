import React, { useState } from 'react';
import '../componentes/css/Agendamento.css';

function AgendamentoConsulta() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    servico: '',
    data: '',
    horario: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode conectar com API, banco de dados ou enviar via WhatsApp
    alert(`Consulta agendada com sucesso!\nPaciente: ${formData.nome}\nServiço: ${formData.servico}\nData: ${formData.data} às ${formData.horario}`);
  };

  return (
    <div className="form-container">
      <h1>Agendar Consulta</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome completo:
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
        </label>

        <label>
          Telefone / WhatsApp:
          <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} required />
        </label>

        <label>
          Serviço desejado:
          <select name="servico" value={formData.servico} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="Podologia">Podologia</option>
            <option value="Reflexologia">Reflexologia</option>
            <option value="Unha encravada">Unha encravada</option>
            <option value="Hidratação dos pés">Hidratação dos pés</option>
          </select>
        </label>

        <label>
          Data da consulta:
          <input type="date" name="data" value={formData.data} onChange={handleChange} required />
        </label>

        <label>
          Horário:
          <input type="time" name="horario" value={formData.horario} onChange={handleChange} required />
        </label>

        <button type="submit" className="btn-agendar">Confirmar Agendamento</button>
      </form>
    </div>
  );
}

export default AgendamentoConsulta;
