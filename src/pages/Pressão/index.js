import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Pressao({ navigation }) {
  // Simulação de última medição (você pode substituir com dados reais depois)
  const sistolica = 1;
  const diastolica = 1;

  const obterClassificacao = (sis, dia) => {
    if (sis < 120 && dia < 80) {
      return {
        nivel: 'Normal',
        cor: styles.classificacaoVerde,
        recomendacao: 'Continue com hábitos saudáveis.',
      };
    } else if ((sis >= 120 && sis <= 129) && dia < 80) {
      return {
        nivel: 'Elevada',
        cor: styles.classificacaoAmarela,
        recomendacao: 'Evite sal e pratique atividades físicas.',
      };
    } else if ((sis >= 130 && sis <= 139) || (dia >= 80 && dia <= 89)) {
      return {
        nivel: 'Hipertensão Estágio 1',
        cor: styles.classificacaoLaranja,
        recomendacao: 'Consulte um profissional de saúde.',
      };
    } else if (sis >= 140 || dia >= 90) {
      return {
        nivel: 'Hipertensão Estágio 2',
        cor: styles.classificacaoVermelha,
        recomendacao: 'Requer atenção médica imediata.',
      };
    } else {
      return {
        nivel: 'Indefinido',
        cor: styles.classificacaoCinza,
        recomendacao: 'Medição incompleta ou inválida.',
      };
    }
  };

  const classificacao = obterClassificacao(sistolica, diastolica);

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
        <Text style={styles.classificacaoTexto}>Sua pressão está: <Text style={styles.classificacaoNivel}>{classificacao.nivel}</Text></Text>
        <Text style={styles.recomendacao}>{classificacao.recomendacao}</Text>
      </View>

      <View style={styles.historicoPressao}>
        <Text style={styles.titulo}>Histórico de pressão</Text>

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
      <TouchableOpacity style={styles.botaoFlutuante} onPress={() => navigation.navigate('Digitar pressão')}>
        <AntDesign name="plus" size={24} color="#fff" />
        {/* Ou use só texto: <Text style={styles.texto}>+</Text> */}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
