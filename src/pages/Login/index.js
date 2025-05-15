import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8081/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default function Login({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  const [idadeUsuario, setIdadeUsuario] = useState('');
  const [alturaUsuario, setAlturaUsuario] = useState('');
  const [pesoUsuario, setPesoUsuario] = useState('');

  const handleChooseImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.7,
      },
      (response) => {
        if (response.didCancel) {
          console.log('Cancelado pelo usuário');
        } else if (response.errorCode) {
          console.log('Erro: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri);
        }
      }
    );
  };

  const handleEnviar = async () => {
    // Validar campos obrigatórios
    if (!nomeUsuario.trim() || !emailUsuario.trim() || !senhaUsuario.trim() || 
        !idadeUsuario.trim() || !alturaUsuario.trim() || !pesoUsuario.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    // Converter valores numéricos
    const idade = parseInt(idadeUsuario);
    const altura = parseFloat(alturaUsuario);
    const peso = parseFloat(pesoUsuario);

    if (isNaN(idade)) {
      Alert.alert('Erro', 'Idade deve ser um número válido');
      return;
    }

    if (isNaN(altura)) {
      Alert.alert('Erro', 'Altura deve ser um número válido');
      return;
    }

    if (isNaN(peso)) {
      Alert.alert('Erro', 'Peso deve ser um número válido');
      return;
    }

    // Converter imagem para base64 se existir
    let fotoBase64 = null;
    if (imageUri) {
      try {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        fotoBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error('Erro ao converter imagem:', error);
        Alert.alert('Erro', 'Não foi possível processar a imagem');
        return;
      }
    }

    // Preparar dados para a API exatamente como o backend espera
    const dados = {
      nomeUsuario: nomeUsuario,
      emailUsuario: emailUsuario,
      senhaUsuario: senhaUsuario,
      idadeUsuario: idade,
      alturaUsuario: altura,
      pesoUsuario: peso,
      fotoBase64: fotoBase64
    };

    console.log('Dados enviados:', JSON.stringify(dados, null, 2));

    try {
      const response = await api.post('/usuario', dados);

      // Navegação com reset
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro completo:', error);
      console.error('Resposta do erro:', error.response?.data);

      let errorMessage = 'Falha ao enviar os dados.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      Alert.alert('Erro', errorMessage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.cardImg}>
          <Text style={styles.inputLabel}>Foto de Perfil</Text>
          <Pressable onPress={handleChooseImage} style={styles.cardAdcImg}>
            <Image
              source={imageUri ? { uri: imageUri } : {uri: 'https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png'}}
              style={styles.previewImage}
            />
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={nomeUsuario}
            onChangeText={setNomeUsuario}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={emailUsuario}
            onChangeText={setEmailUsuario}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Crie uma senha segura"
            secureTextEntry
            value={senhaUsuario}
            onChangeText={setSenhaUsuario}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.inputLabel}>Idade</Text>
            <TextInput
              style={styles.input}
              placeholder="Anos"
              keyboardType="numeric"
              value={idadeUsuario}
              onChangeText={setIdadeUsuario}
            />
          </View>

          <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.inputLabel}>Altura (m)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 1.75"
              keyboardType="numeric"
              value={alturaUsuario}
              onChangeText={setAlturaUsuario}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Peso (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 68.5"
            keyboardType="numeric"
            value={pesoUsuario}
            onChangeText={setPesoUsuario}
          />
        </View>

        <TouchableOpacity style={styles.btnEnviar} onPress={handleEnviar}>
          <Text style={styles.btnText}>CADASTRAR</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardImg: {
    alignItems: 'center',
    marginVertical: 20,
  },
  cardAdcImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 10,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnEnviar: {
    backgroundColor: '#32A017',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});