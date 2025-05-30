import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../componentes/css/PacienteList.css';

const PacientesList = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const dadosMockados = [
          {
            id: 1,
            nomeCompleto: 'João Silva Santos',
            cpf: '123.456.789-00',
            rg: '12.345.678-9',
            dataNascimento: '15/05/1980',
            telefone: '(11) 98765-4321',
            email: 'joao.silva@example.com'
          },
          {
            id: 2,
            nomeCompleto: 'Maria Oliveira Souza',
            cpf: '987.654.321-00',
            rg: '98.765.432-1',
            dataNascimento: '22/10/1992',
            telefone: '(21) 99876-5432',
            email: 'maria.oliveira@example.com'
          },
          {
            id: 3,
            nomeCompleto: 'Carlos Alberto Pereira',
            cpf: '456.789.123-00',
            rg: '45.678.912-3',
            dataNascimento: '03/07/1975',
            telefone: '(31) 98765-1234',
            email: 'carlos.pereira@example.com'
          }
        ];
        setPacientes(dadosMockados);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os pacientes');
        setLoading(false);
        console.error(err);
      }
    };
    fetchPacientes();
  }, []);

  const handleExcluirPaciente = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      const pacientesAtualizados = pacientes.filter(paciente => paciente.id !== id);
      setPacientes(pacientesAtualizados);
      alert('Paciente excluído com sucesso!');
    }
  };

  if (loading) return <div className="loading">Carregando pacientes...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="pacientes-container">
      <div className="header-container">
        <h1>Pacientes Salvo </h1>

         <Link to="/PainelPodologo" id='voltar'>
          Home
        </Link>
        
      </div>
      
      <div className="pacientes-list">
        {pacientes.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Nome Completo</th>
                <th>CPF/RG</th>
                <th>Data de Nascimento</th>
                <th>Contato</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <React.Fragment key={paciente.id}>
                  <tr>
                    <td rowSpan="2">{paciente.nomeCompleto}</td>
                    <td>CPF: {paciente.cpf}</td>
                    <td rowSpan="2">{paciente.dataNascimento}</td>
                    <td>Telefone: {paciente.telefone}</td>
                    <td rowSpan="2">
                      <button 
                        className="btn-excluir"
                        onClick={() => handleExcluirPaciente(paciente.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>RG: {paciente.rg}</td>
                    <td>E-mail: {paciente.email}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum paciente cadastrado.</p>
        )}
      </div>
    </div>
  );
};

export default PacientesList;