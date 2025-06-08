import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Pressable, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons'; // ícone opcional
import { Alert } from 'react-native';
import NiveisGlicemia from '../../Components/NiveisGlicemia'; // importa o gráfico
//
export default function Diabetes({ navigation }) {
  const [glicemia, setGlicemia] = useState([]);
  const [ultimoRegistro, setUltimoRegistro] = useState();
  const [percentuais, setPercentuais] = useState({ baixa: 0, normal: 0, alta: 0 });

  const ultimoRegistroDiabete = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8081/api/diabetes/ultimoRegistro");
      if (response.status === 200) {
        setUltimoRegistro(response.data);
      }
      else {
        Alert.alert(
          "Erro",);
      }
    }
    catch (error) {
      console.error("Erro ao buscar último registro de pressão:", error);
      Alert.alert("Erro", "Falha na conexão com o servidor");
    }
  };


  const fetchDiabetes = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8081/api/diabetes/listar"
      );

      if (response.status === 200) {
        if (Array.isArray(response.data)) {
          setGlicemia(response.data);
          calcularPercentuais(response.data); // ADICIONE AQUI!
        } else {
          const dados = Array.isArray(response.data) ? response.data : Object.values(response.data);
          setGlicemia(dados);
          calcularPercentuais(dados);
        }
      } else {
        console.error("Erro na API:", response.status, response.statusText);
        Alert.alert(
          "Erro",
          "Não foi possível carregar os registros de diabetes"
        );
      }
    } catch (error) {
      console.error("Erro ao buscar registros de pressão:", error);
      Alert.alert("Erro", "Falha na conexão com o servidor");
    }
  };

  const calcularPercentuais = (dados) => {
    const total = dados.length;
    let baixa = 0, normal = 0, alta = 0;

    dados.forEach((item) => {
      const valor = parseFloat(item.glicemiaDiabete);
      if (valor < 70) {
        baixa++;
      }
      else if (valor >= 70 && valor <= 140) {
        normal++;
      }
      else alta++;
    });

    if (total > 0) {
      setPercentuais({
        baixa: ((baixa / total) * 100).toFixed(2),
        normal: ((normal / total) * 100).toFixed(2),
        alta: ((alta / total) * 100).toFixed(2)
      });
    }
  }


  useEffect(() => {
    fetchDiabetes();
    ultimoRegistroDiabete();
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      {ultimoRegistro?.data?.glicemiaDiabete ? (

        <View style={styles.ultimaMedida}>
          <Text style={styles.titulo}>Última Medida</Text>
          <View style={styles.medidaItem}>
            <Text style={styles.medidaTitulo}>Glicemia</Text>
            <Text style={styles.qntMedida}>{ultimoRegistro.data.glicemiaDiabete} mg/dL </Text>
          </View>
          <View style={styles.ultimaMedidaItem}>
            <Text style={styles.data}>Data: {ultimoRegistro.data.dataDiabete}</Text>
            <Text style={styles.horario}>{ultimoRegistro.data.horaDiabete}</Text>
          </View>

        </View>
      ) : (
        <View style={styles.ultimaMedida}>
          <Text style={styles.titulo}>Última Medida</Text>
          <Text style={{ textAlign: 'center', fontSize: 16, color: '#666' }}> Nenhum registro encontrado. </Text>
        </View>
      )}

      <NiveisGlicemia {...percentuais} />


      <View style={styles.historicoGlicemia}>
        <View style={styles.viewTituloHistorico}>
          <Text style={styles.tituloHistorico}> Histórico de glicemia   </Text>
        </View>
        <FlatList
          data={glicemia}
          showsHorizontalScrollIndicator={false}
          indicator
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item: registro }) => (
            <View style={styles.historicoGlicemiaItem}>
              <Text style={styles.historicoGlicemiaValor}>{registro.glicemiaDiabete}mg/dL</Text>
              <Text style={styles.historicoGlicemiaPeriodoRefeicao}> {registro.momentoMedicaoDiabete} </Text>
              <View style={styles.dataHoraHistorico}>
                <Text style={styles.historicoGlicemiaData}>{registro.dataDiabete}</Text>
                <Text style={styles.historicoGlicemiaHorario}>{registro.horaDiabete}</Text>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separador} />}
          ListEmptyComponent={
            <Text style={styles.semRegistros}>Nenhum registro encontrado.</Text>
          }
          contentContainerStyle={glicemia.length === 0 && styles.listaVazia}
        />
      </View>

      <TouchableOpacity style={styles.botaoFlutuante} onPress={() => navigation.navigate('Digitar diabete')}>
        <AntDesign name="plus" size={24} color="#fff" />
        {/* Ou use só texto: <Text style={styles.texto}>+</Text> */}
      </TouchableOpacity>
    </SafeAreaView>
  );
};