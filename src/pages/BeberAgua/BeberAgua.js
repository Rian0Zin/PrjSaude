import { StatusBar } from "expo-status-bar";
import { View, Pressable, Image, Text, Modal, StyleSheet } from "react-native";
import { useState } from "react";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function BeberAgua({navigation}) {
  const [aguaConsumida, setAguaConsumida] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const atualizarAgua = (quantidade) => {
    let novaQuantidade = aguaConsumida + quantidade;

    if (novaQuantidade < 0) {
      novaQuantidade = 0;
    } else if (novaQuantidade > 2000) {
      novaQuantidade = 2000;
    }

    setAguaConsumida(novaQuantidade);

    if (novaQuantidade >= 2000) {
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        setAguaConsumida(0); 
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerGrafico}>
        <AnimatedCircularProgress
          size={240}
          width={60}
          fill={(aguaConsumida / 2000) * 100}
          tintColor="#73C2FE"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#E8E8E8"
        />
        <Text style={{ fontWeight: 600, marginVertical: 20 }}>
          {aguaConsumida} ml de água diária consumida
        </Text>
      </View>

      <View style={styles.RowBotaoContainer}>
        <View style={styles.columnBotaoContainer}>
          <Pressable style={styles.botaoAdc} onPress={() => atualizarAgua(200)}>
            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require('../../../assets/copoAgua.png')}
              />
            </View>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.textoAdc}>+200ML</Text>
            </View>
          </Pressable>
          <Pressable style={styles.botaoAdc} onPress={() => atualizarAgua(500)}>
            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={{ width: 45, height: 45 }}
                source={require('../../../assets//garrafaUmLitro.png')}
              />
            </View>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.textoAdc}>+500ML</Text>
            </View>
          </Pressable>
        </View>

        <View style={[styles.columnBotaoContainer, { paddingLeft: 5 }]}>
          <Pressable style={styles.botaoAdc} onPress={() => atualizarAgua(1000)}>
            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={{ width: 40, height: 40 }}
                source={require('../../../assets/garrafaDoisLitros.png')}
              />
            </View>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.textoAdc}>+1000ML</Text>
            </View>
          </Pressable>
          <Pressable style={styles.botaoAdc} onPress={() => atualizarAgua(-200)}>
            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require('../../../assets/copoAgua.png')}
              />
            </View>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.textoAdc}>-200ML</Text>
            </View>
          </Pressable>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTexto}>Parabéns! Você atingiu a meta de 2000ML!</Text>
            <Pressable style={styles.botaoAdc} onPress={() => setModalVisible(false)}>
              <Text style={styles.textoAdc}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerGrafico: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  RowBotaoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  columnBotaoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoAdc: {
    width: 150,
    height: 50,
    backgroundColor: '#E8E8E8',
    marginVertical: 2.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textoAdc: {
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTexto: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});
