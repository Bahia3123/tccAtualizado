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
        const response = await fetch('http://localhost:3001/PacienteList');

        if (!response.ok) {
          const errorMessage = `Erro na resposta da API: ${response.status} ${response.statusText}`;
          console.error(errorMessage);
          throw new Error(errorMessage);
        }

        const data = await response.json();
        const pacientesFormatados = data.map((p, index) => ({
          id: index + 1,
          nomeCompleto: p.nome,
          cpf: p.cpf_rg,
          dataNascimento: new Date(p.data_nascimento).toLocaleDateString(),
          telefone: p.telefone,
          email: p.email,
        }));
        setPacientes(pacientesFormatados);
      } catch (err) {
        console.error('Erro ao carregar os pacientes do banco de dados:', err);
        setError('Erro ao carregar os pacientes do banco de dados. Verifique a conexão com o servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  const handleExcluirPaciente = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      const pacientesAtualizados = pacientes.filter(paciente => paciente.id !== id);
      setPacientes(pacientesAtualizados);
      alert('Paciente excluído com sucesso!');
      // Aqui você pode adicionar uma requisição DELETE se quiser excluir do backend também
    }
  };

  if (loading) return <div className="loading">🔄 Carregando pacientes...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="pacientes-container">
      <div className="header-container">
        <h1>Pacientes Salvos</h1>
        <Link to="/PainelPodologo" id="voltar">🏠 Home</Link>
      </div>

      <div className="pacientes-list">
        {pacientes.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Nome Completo</th>
                <th>CPF</th>
                <th>Data de Nascimento</th>
                <th>Contato</th>
                <th>E-mail</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <React.Fragment key={paciente.id}>
                  <tr>
                    <td rowSpan="2">{paciente.nomeCompleto}</td>
                    <td> {paciente.cpf}</td>
                    <td rowSpan="2">{paciente.dataNascimento}</td>
                    <td> {paciente.telefone}</td>
                    <td> {paciente.email}</td>

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
