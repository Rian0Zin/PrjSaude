import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Pressable, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons'; // ícone opcional
//
export default function Diabetes({ navigation }) {
  const [glicemia, setGlicemia] = useState('');
  const fetchDiabetes = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8081/api/diabetes/listar"
      );

      if (response.status === 200) {
        if (Array.isArray(response.data)) {
          setGlicemia(response.data);
        } else {
          // Se for objeto, converte para array
          const diabetesArray = Object.values(response.data);
          setGlicemia(diabetesArray);
        }
      } else {
        console.error("Erro na API:", response.status, response.statusText);
        Alert.alert(
          "Erro",
          "Não foi possível carregar os registros de pressão"
        );
      }
    } catch (error) {
      console.error("Erro ao buscar registros de pressão:", error);
      Alert.alert("Erro", "Falha na conexão com o servidor");
    }
  };

  useEffect(() => {
    fetchDiabetes();
  })
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ultimaMedida}>
        <Text style={styles.titulo}>Última Medida</Text>
        <View style={styles.medidaItem}>
        <Text style={styles.medidaTitulo}>Glicemia</Text>
        <Text style={styles.qntMedida}>100 mg/dL </Text>
        </View>
        <View style={styles.ultimaMedidaItem}>
          <Text style={styles.data}>Data: 01/01/2023</Text> <Text style={styles.horario}> 03:33 </Text>
        </View>
      </View>
      <View style={styles.indicadores}>
        <Text style={styles.tituloGrafico}>Níveis de Glicemia</Text>

        <Text style={styles.legenda}>Baixa (20%)</Text>
        <View style={styles.barra}>
          <View style={[styles.barraInterna, { width: '20%', backgroundColor: '#3498db' }]} />
        </View>

        <Text style={styles.legenda}>Normal (60%)</Text>
        <View style={styles.barra}>
          <View style={[styles.barraInterna, { width: '60%', backgroundColor: '#2ecc71' }]} />
        </View>

        <Text style={styles.legenda}>Alta (20%)</Text>
        <View style={styles.barra}>
          <View style={[styles.barraInterna, { width: '20%', backgroundColor: '#e74c3c' }]} />
        </View>
      </View>
      
        <View style={styles.historicoGlicemia}>
          <View style={styles.viewTituloHistorico}>
            <Text style={styles.tituloHistorico}> Histórico de glicemia   </Text>
          </View>
          <View style={styles.historicoGlicemiaItem}>
            <Text style={styles.historicoGlicemiaValor}>100 mg/dL</Text>
            <Text style={styles.historicoGlicemiaPeriodoRefeicao}> Periodo da refeição </Text>
            <View style={styles.dataHoraHistorico}>
              <Text style={styles.historicoGlicemiaData}>01/01/2023</Text>
              <Text style={styles.historicoGlicemiaHorario}>03:33</Text>
            </View>
          </View>
        </View>
          <View style={styles.historicoGlicemia}>
          </View>
      
      <TouchableOpacity style={styles.botaoFlutuante} onPress={() => navigation.navigate('Digitar diabete')}>
        <AntDesign name="plus" size={24} color="#fff" />
        {/* Ou use só texto: <Text style={styles.texto}>+</Text> */}
      </TouchableOpacity>
    </SafeAreaView>
  );
};