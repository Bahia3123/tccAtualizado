import { createContext, useContext, useState } from 'react';

// Contexto para os dados do paciente atual
const UserContext = createContext();

// Provider para o contexto do usuário
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para acessar o contexto de usuário
export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser precisa estar dentro de um UserProvider');
  }

  return context;
};
