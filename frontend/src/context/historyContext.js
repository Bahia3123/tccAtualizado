import React, { createContext, useContext, useState, useEffect } from 'react';

const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [historico, setHistorico] = useState(() => {
    try {
      const saved = localStorage.getItem('historicoPacientes');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Erro ao ler do localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('historicoPacientes', JSON.stringify(historico));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  }, [historico]);

  const adicionarPaciente = (paciente) => {
    setHistorico(prevHistorico => {
      const pacienteExistente = prevHistorico.find(p => p.cpf_rg === paciente.cpf_rg);
      
      if (pacienteExistente && pacienteExistente.status === 'ativo') {
        alert('Paciente com este CPF/RG já está cadastrado!');
        return prevHistorico;
      }
      
      const novoHistorico = prevHistorico.filter(p => p.cpf_rg !== paciente.cpf_rg);
      return [...novoHistorico, { ...paciente, status: 'ativo' }];
    });
  };

  const inativarPaciente = (cpf) => {
    setHistorico(prevHistorico => {
      return prevHistorico.map(paciente => 
        paciente.cpf_rg === cpf ? { ...paciente, status: 'inativo' } : paciente
      );
    });
  };

  const excluirPaciente = (cpf) => {
    setHistorico(prevHistorico => {
      return prevHistorico.filter(paciente => paciente.cpf_rg !== cpf);
    });
  };

  const limparHistorico = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o histórico?')) {
      setHistorico([]);
    }
  };

  return (
    <HistoryContext.Provider value={{ 
      historico, 
      adicionarPaciente,
      inativarPaciente,
      excluirPaciente,
      limparHistorico
    }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory deve ser usado dentro de um HistoryProvider');
  }
  return context;
}