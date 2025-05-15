// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext();

const api = axios.create({
  baseURL: 'http://127.0.0.1:8081/api',
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      const storedUser = await AsyncStorage.getItem('@Auth:user');
      const storedToken = await AsyncStorage.getItem('@Auth:token');
      
      if (storedUser && storedToken) {
        api.defaults.headers['Authorization'] = `Bearer ${storedToken}`;
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    loadStorageData();
  }, []);

  const signIn = async (email, senha) => {
    try {
      const response = await api.post('/login', { emailUsuario: email, senhaUsuario: senha });
      
      const { usuario, token } = response.data;
      
      setUser(usuario);
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      
      await AsyncStorage.setItem('@Auth:user', JSON.stringify(usuario));
      await AsyncStorage.setItem('@Auth:token', token);
      
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('@Auth:user');
    await AsyncStorage.removeItem('@Auth:token');
    setUser(null);
    delete api.defaults.headers['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;