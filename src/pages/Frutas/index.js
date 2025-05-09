import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Image, Pressable, FlatList, Modal, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';

const urlBase = 'https://api.calorieninjas.com/v1/nutrition?query';

export const apiFruta = async (query) => {
  try {
    const response = await axios.post(
      "https://trackapi.nutritionix.com/v2/search/instant",
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          "x-app-id": '59b2da82',
          "x-app-key": 'ff97df75244eb96a4165c2423e651ff0',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados nutricionais:", error);
    return error;
  }
};

export default function Frutas({ navigation }) {
  const [fruta, setFruta] = useState("");
  const [resultados, setResultados] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  async function buscarFruta() {
    if (fruta.trim() === "") {
      alert("Digite algo");
    } else {
      setModalVisible(true);
      const resposta = await apiFruta(fruta);
      setResultados(resposta.branded || []);
      setModalVisible(false);
    }
  }

  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <View style={styles.containerBarraPesquisa}>
        <Pressable onPress={buscarFruta}>
          <Image
            source={require('../../../assets/search.png')}
            style={styles.imgBarraPesquisa}
          />
        </Pressable>
        <TextInput
          style={styles.barraPesquisa}
          placeholder="Insira um alimento aqui!"
          placeholderTextColor="#888"
          value={fruta}
          onChangeText={setFruta}
          onSubmitEditing={buscarFruta} // ENTER ativa a busca
          returnKeyType="search"
        />
      </View>

      {modalVisible && (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      )}

      <View style={styles.containerConteudo}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.FlatList}
          data={resultados}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.imagemCard}>
                <Image style={styles.image} source={{ uri: item.photo.thumb }} />
              </View>
              <View style={styles.textoCard}>
                <Text style={styles.textoCalorias} numberOfLines={1} ellipsizeMode="tail">
                  Nome: {item.brand_name}
                </Text>
                <Text style={styles.textoCalorias}>
                  Calorias: {item.nf_calories}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  containerBarraPesquisa: {
    justifyContent: 'flex-start',
    width: '95%',
    margin: 10,
    marginTop: 10,
  },
  barraPesquisa: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#8888',
  },
  imgBarraPesquisa: {
    position: 'absolute',
    top: 7,
    left: '93%',
    width: 20,
    height: 20,
    backgroundColor: 'white'
  },
  containerConteudo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  card: {
    shadowColor: 'grey',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    minHeight: 150,
    width: 350,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20
  },
  imagemCard: {
    borderWidth: 1,
    borderColor: '#8888',
    width: '45%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: 135,
    resizeMode: 'cover'
  },
  textoCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '55%',
  },
  textoCalorias: {
    paddingVertical: '5%'
  },
});
