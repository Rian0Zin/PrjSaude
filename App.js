import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Routes from './src/Routes';

const Drawer = createDrawerNavigator();

export default function App() {
  return <Routes/>;
  
}