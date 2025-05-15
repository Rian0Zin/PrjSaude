import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AuthProvider } from './src/contexts/authContext';

import Routes from './src/Routes';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}