import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, Animated } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import frases from './frases.json';
import styles from "./styles";
export default function FrasesMotivacionais({ navigation }) {
  const [frase, setFrase] = useState('');
  const [autor, setAutor] = useState('');

  const opacity = useRef(new Animated.Value(1)).current;

  const definirFrase = () => {
    const idFrase = Math.floor(Math.random() * frases.length);
    setFrase(frases[idFrase].frase);
    setAutor(frases[idFrase].autor);
  };


  const trocarFraseComFade = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      definirFrase(); 
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    definirFrase();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.fraseContainer, { opacity }]}>
        <Text style={styles.fraseText}>"{frase}"</Text>
        <Text style={styles.autorText}>— {autor}</Text>
      </Animated.View>

      <TouchableOpacity onPress={trocarFraseComFade} style={styles.botao}>
        <Text style={styles.textoBotao}>Nova Frase</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}