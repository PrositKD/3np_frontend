import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      
    }
  },
 []);



  const login = (email, cookie) => {
    const newUser = { email, cookie };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));

  };

  

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    TriggerLogout();
  };


  async function TriggerLogout() {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_SELLER+ 'auth/signout',
              {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                withCredentials: true
              }
            );
      console.log(response)
        setUser(null);
        document.cookie = null;
    } catch (error) {
      console.error('error failed: ', error);
    }
  }


  return (
    <AuthContext.Provider value={{ user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);