import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import frases from './frases.json';

export default function FrasesMotivacionais({ navigation }) {
  const [frase, setFrase] = useState('');
  const [autor, setAutor] = useState('');

  const definirFrase = () => {
    const idFrase = Math.floor(Math.random() * frases.length);
    setFrase(frases[idFrase].frase);
    setAutor(frases[idFrase].autor);
  };

  useEffect(() => {
    definirFrase();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fraseContainer}>
        <Text style={styles.fraseText}>"{frase}"</Text>
        <Text style={styles.autorText}>— {autor}</Text>
      </View>

      <TouchableOpacity onPress={definirFrase} style={styles.botao}>
        <Text style={styles.textoBotao}>Nova Frase</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fraseContainer: {
    width: '100%',
    height:'40%',
    backgroundColor: '#f2fdf3',
    justifyContent:'center',
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  fraseText: {
    fontSize: 24,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 12,
  },
  autorText: {
    fontSize: 16,
    textAlign: 'right',
    color: '#555',
  },
  botao: {
    marginTop: 40,
    backgroundColor: '#fff', // verde médio
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#4caf50',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  textoBotao: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  }
};
