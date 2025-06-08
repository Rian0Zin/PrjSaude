import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";

export default function Pressao({ navigation }) {
  // Simulação de última medição (você pode substituir com dados reais depois)
  const sistolica = 1;
  const diastolica = 1;
  const [pressao, setPressao] = useState([]);
  const [ultimoRegistro, setUltimoRegistro] = useState();
  const [classificacao, setClassificacao] = useState(null);

  const ultimoRegistroPressao = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8081/api/pressao/ultimoRegistro");
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

  const fetchPressao = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8081/api/pressao/listar"
      );

      if (response.status === 200) {
        if (Array.isArray(response.data)) {
          setPressao(response.data);
        } else {
          // Se for objeto, converte para array
          const pressaoArray = Object.values(response.data);
          setPressao(pressaoArray);
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

  ;

  useEffect(() => {
    fetchPressao();
    ultimoRegistroPressao();

  }, []);

  useEffect(() => {
    if (ultimoRegistro?.data?.sistolicaPressao && ultimoRegistro?.data?.diastolicaPressao) {
      const resultado = obterClassificacao(
        ultimoRegistro.data.sistolicaPressao,
        ultimoRegistro.data.diastolicaPressao
      );
      setClassificacao(resultado);
    }
  }, [ultimoRegistro]);
  return (
    <SafeAreaView style={styles.container}>
      {ultimoRegistro?.data?.sistolicaPressao && ultimoRegistro?.data?.diastolicaPressao ? (
        console.log(ultimoRegistro),

        <View style={styles.ultimaMedida}>
          <Text style={styles.titulo}>Última Medida</Text>

          <View style={styles.medidasLinha}>
            <View style={styles.medidaItem}>
              <Text style={styles.medidaTitulo}>Sistólica</Text>
              <Text style={styles.qntMedida}>{ultimoRegistro.data.sistolicaPressao} mmHg</Text>
            </View>
            <View style={styles.medidaItem}>
              <Text style={styles.medidaTitulo}>Diastólica</Text>
              <Text style={styles.qntMedida}>{ultimoRegistro.data.diastolicaPressao} mmHg</Text>
            </View>
            <View style={styles.medidaItem}>
              <Text style={styles.medidaTitulo}>Pulso</Text>
              <Text style={styles.qntMedida}>{ultimoRegistro.data.pulsoPressao} bpm</Text>
            </View>
          </View>

          <View style={styles.ultimaMedidaItem}>
            <Text style={styles.data}>Data: {ultimoRegistro.data.dataPressao}</Text>
            <Text style={styles.horario}>Horário: {ultimoRegistro.data.horaPressao}</Text>
          </View>
        </View>
      ) :
        (
          <View style={styles.ultimaMedida}>
            <Text style={styles.titulo}>Última Medida</Text>

            <Text style={{textAlign: 'center',              fontSize: 16, color: '#666'
            }}>Nenhum registro encontrado.</Text>
          </View>
        )}
      {classificacao ? (
        <View style={[styles.classificacaoContainer, classificacao.cor]}>
          <Text style={styles.classificacaoTitulo}>Classificação Atual</Text>
          <Text style={styles.classificacaoTexto}>
            Sua pressão está:{" "}
            <Text style={styles.classificacaoNivel}>{classificacao.nivel}</Text>
          </Text>
          <Text style={styles.recomendacao}>{classificacao.recomendacao}</Text>
        </View>
      ) : (
        <View style={[styles.classificacaoContainer, styles.classificacaoCinza]}>
          <Text style={styles.classificacaoTitulo}>Classificação Atual</Text>
          <View style={{alignItems: 'center'}}>
          <Text style={styles.classificacaoTexto}>
            Nenhum registro encontrado.
          </Text>
          <Text style={styles.classificacaoNivel}>Faça um registro para saber sobre seu estado.</Text>
          </View>
        </View>)}

      <View style={styles.historicoPressao}>
        <Text style={styles.titulo}>Histórico de pressão</Text>

        {pressao.length > 0 ? (
          <FlatList
            data={pressao}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item: registro }) => (
              <View style={styles.registroContainer}>
                <View style={styles.medidasLinha}>
                  <View style={styles.medidaItem}>
                    <Text style={styles.medidaTitulo}>Sistólica</Text>
                    <Text style={styles.qntMedida}>
                      {registro.sistolicaPressao}mmHg
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
            )}
            ItemSeparatorComponent={() => <View style={styles.separador} />}
            ListEmptyComponent={
              <Text style={styles.semRegistros}>Nenhum registro encontrado.</Text>
            }
            contentContainerStyle={pressao.length === 0 && styles.listaVazia}
          />
        ) : (
          <Text style={styles.semRegistros}>Nenhum registro encontrado.</Text>
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
