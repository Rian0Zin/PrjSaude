import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";

export default function Pressao({ navigation }) {
  // Simulação de última medição (você pode substituir com dados reais depois)
  const sistolica = 1;
  const diastolica = 1;
  const [pressao, setPressao] = useState([]);
  const fetchPressao = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8081/api/pressao/listar"
      );

      if (response.status === 200) {
        const pressaoRegistros = response.data.map((pressao) => ({
          ...pressao,
        }));
        setPressao(pressaoRegistros);
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

  const obterClassificacao = (sis, dia) => {
    if (sis < 120 && dia < 80) {
      return {
        nivel: "Normal",
        cor: styles.classificacaoVerde,
        recomendacao: "Continue com hábitos saudáveis.",
      };
    } else if (sis >= 120 && sis <= 129 && dia < 80) {
      return {
        nivel: "Elevada",
        cor: styles.classificacaoAmarela,
        recomendacao: "Evite sal e pratique atividades físicas.",
      };
    } else if ((sis >= 130 && sis <= 139) || (dia >= 80 && dia <= 89)) {
      return {
        nivel: "Hipertensão Estágio 1",
        cor: styles.classificacaoLaranja,
        recomendacao: "Consulte um profissional de saúde.",
      };
    } else if (sis >= 140 || dia >= 90) {
      return {
        nivel: "Hipertensão Estágio 2",
        cor: styles.classificacaoVermelha,
        recomendacao: "Requer atenção médica imediata.",
      };
    } else {
      return {
        nivel: "Indefinido",
        cor: styles.classificacaoCinza,
        recomendacao: "Medição incompleta ou inválida.",
      };
    }
  };

  const classificacao = obterClassificacao(sistolica, diastolica);

  useEffect(() => {
    fetchPressao();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ultimaMedida}>
        <Text style={styles.titulo}>Última Medida</Text>

        <View style={styles.medidasLinha}>
          <View style={styles.medidaItem}>
            <Text style={styles.medidaTitulo}>Sistólica</Text>
            <Text style={styles.qntMedida}>100 mmHg</Text>
          </View>
          <View style={styles.medidaItem}>
            <Text style={styles.medidaTitulo}>Diastólica</Text>
            <Text style={styles.qntMedida}>100 mmHg</Text>
          </View>
          <View style={styles.medidaItem}>
            <Text style={styles.medidaTitulo}>Pulso</Text>
            <Text style={styles.qntMedida}>100 bpm</Text>
          </View>
        </View>

        <View style={styles.ultimaMedidaItem}>
          <Text style={styles.data}>Data: 01/01/2023</Text>
          <Text style={styles.horario}>Horário: 03:33</Text>
        </View>
      </View>
      <View style={[styles.classificacaoContainer, classificacao.cor]}>
        <Text style={styles.classificacaoTitulo}>Classificação Atual</Text>
        <Text style={styles.classificacaoTexto}>
          Sua pressão está:{" "}
          <Text style={styles.classificacaoNivel}>{classificacao.nivel}</Text>
        </Text>
        <Text style={styles.recomendacao}>{classificacao.recomendacao}</Text>
      </View>
      <View style={styles.historicoPressao}>
        <Text style={styles.titulo}>Histórico de pressão</Text>

        {pressao.length > 0 ? (
          pressao.map((registro, index) => (
            <View key={index} style={{marginBottom:25, borderBottomWidth:2, borderBottomColor:'black'}}>
              <View style={styles.medidasLinha}>
                <View style={styles.medidaItem}>
                  <Text style={styles.medidaTitulo}>Sistólica</Text>
                  <Text style={styles.qntMedida}>
                    {registro.sistolicaPressao }mmHg
                  </Text>
                </View>
                <View style={styles.medidaItem}>
                  <Text style={styles.medidaTitulo}>Diastólica</Text>
                  <Text style={styles.qntMedida}>
                    {registro.diastolicaPressao} mmHg
                  </Text>
                </View>
                <View style={styles.medidaItem}>
                  <Text style={styles.medidaTitulo}>Pulso</Text>
                  <Text style={styles.qntMedida}>{registro.pulsoPressao} bpm</Text>
                </View>
              </View>

              <View style={styles.ultimaMedidaItem}>
                <Text style={styles.data}>Data: {registro.dataPressao}</Text>
                <Text style={styles.horario}>
                  Horário: {registro.horaPressao}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text>AAAI</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.botaoFlutuante}
        onPress={() => navigation.navigate("Digitar pressão")}
      >
        <AntDesign name="plus" size={24} color="#fff" />
        {/* Ou use só texto: <Text style={styles.texto}>+</Text> */}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
