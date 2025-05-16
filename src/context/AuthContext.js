import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [error, setError] = useState(null);

  // Ajoutez cette fonction dans votre contexte
const login = async (credentials) => {
    try {
      // Simulation de connexion
      let userData;
      if (credentials.email.includes('admin')) {
        userData = { 
          email: credentials.email, 
          role: 'admin', 
          token: 'fake-admin-token',
          redirectTo: '/admin/dashboard' // Redirection pour admin
        };
      } else {
        userData = { 
          email: credentials.email, 
          role: 'user', 
          token: 'fake-user-token',
          redirectTo: '/' // Redirection pour user
        };
      }
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setError(null);
      return { success: true, redirectTo: userData.redirectTo };
    } catch (err) {
      setError('Échec de la connexion');
      return { success: false };
    }
  };

  const register = async (userData) => {
    try {
      // Simulation d'enregistrement
      const newUser = {
        ...userData,
        id: Math.random().toString(36).substring(7),
        token: 'fake-new-user-token'
      };
      
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      setError(null);
      return { success: true };
    } catch (err) {
      setError("Échec de l'inscription. L'email existe peut-être déjà.");
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);