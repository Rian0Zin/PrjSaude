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
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8081/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default function Registro({ navigation }) {
  const [imageUri, setImageUri] = useState('https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  const [idadeUsuario, setIdadeUsuario] = useState('');
  const [alturaUsuario, setAlturaUsuario] = useState('');
  const [pesoUsuario, setPesoUsuario] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errosFormulario, setErrosFormulario] = useState({
    nome: '',
    email: '',
    senha: '',
    idade: '',
    altura: '',
    peso: ''
  });
  const [erroEmail, setErroEmail] = useState('');

  // Função para verificar email existente
  async function verificarEmailExistente(email) {
    try {
      const resposta = await api.get(`/verificar-email?email=${email}`);
      return resposta.data.existe;
    } catch (erro) {
      console.error('Erro ao verificar email:', erro);
      return false;
    }
  }

  // Validação de email básica
  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Valida todos os campos
  function validarFormulario() {
    const erros = {
      nome: !nomeUsuario.trim() ? 'Nome completo é obrigatório' : '',
      email: !emailUsuario.trim() ? 'Email é obrigatório' : !validarEmail(emailUsuario) ? 'Email inválido' : '',
      senha: !senhaUsuario.trim() ? 'Senha é obrigatória' : '',
      idade: !idadeUsuario.trim() ? 'Idade é obrigatória' : isNaN(parseInt(idadeUsuario)) ? 'Idade deve ser um número' : '',
      altura: !alturaUsuario.trim() ? 'Altura é obrigatória' : isNaN(parseFloat(alturaUsuario)) ? 'Altura deve ser um número' : '',
      peso: !pesoUsuario.trim() ? 'Peso é obrigatório' : isNaN(parseFloat(pesoUsuario)) ? 'Peso deve ser um número' : ''
    };
  
    if (erroEmail) erros.email = erroEmail;
  
    setErrosFormulario(erros);
    return !Object.values(erros).some(erro => erro !== '');
  }

  async function MudancaEmail(texto) {
    setEmailUsuario(texto);
    
    if (texto.trim().length > 0) {
      if (!validarEmail(texto)) {
        setErroEmail('Email inválido');
      } else {
        const existe = await verificarEmailExistente(texto);
        setErroEmail(existe ? 'Este email já está cadastrado' : '');
      }
    } else {
      setErroEmail('');
    }
  }

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
    // Validação do formulário
    if (!validarFormulario()) {
      return;
    }

    // Verificação de email existente
    const emailExiste = await verificarEmailExistente(emailUsuario);
    if (emailExiste) {
      Alert.alert('Cadastro não realizado', 'Este email já está cadastrado!');
      return;
    }

    // Converter valores numéricos
    const idade = parseInt(idadeUsuario);
    const altura = parseFloat(alturaUsuario);
    const peso = parseFloat(pesoUsuario);

    // Converter imagens para base64 se existirem
    let fotoBase64 = null;
    
    try {
      if (imageUri) {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        fotoBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      }
    } catch (error) {
      console.error('Erro ao converter imagem:', error);
      Alert.alert('Erro', 'Não foi possível processar as imagens');
      return;
    }   

    // Preparar dados para a API
     const dados = {
      nomeUsuario,
      emailUsuario,
      senhaUsuario,
      idadeUsuario: idade,
      alturaUsuario: altura,
      pesoUsuario: peso,
      fotoUsuario: fotoBase64, // <-- use esse nome aqui
    };

    console.log('Dados a serem enviados:', dados); // Verifique no console

    try {
        const response = await api.post('/usuario', dados, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            transformRequest: [(data) => JSON.stringify(data)] // Força stringify
        });
        
        console.log('Resposta completa:', response); // Verifique a resposta
        try {
          await AsyncStorage.setItem('usuario', JSON.stringify({
            nomeUsuario,
            emailUsuario,
            idadeUsuario: idade,
            alturaUsuario: altura,
            pesoUsuario: peso,
            imageUri,
          }));

          console.log('Usuário salvo localmente no AsyncStorage');
        } catch (erro) {
          console.error('Erro ao salvar no AsyncStorage:', erro);
        }

        // Redirecionar para a Home
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
    } catch (error) {
        console.error('Detalhes do erro:', {
            request: error.config,
            response: error.response?.data,
            message: error.message
        });
  };
}

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <SafeAreaView style={styles.container}>

        {/* Foto de Perfil */}
        <View style={styles.cardImg}>
          <Pressable onPress={handleChooseImage} style={styles.cardAdcImg}>
            <Image
              source={{ uri: imageUri }}
              style={styles.previewImage}
            />
          </Pressable>
        </View>

        {/* Nome Completo */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nome Completo</Text>
          <View style={[styles.inputWrapper, errosFormulario.nome ? styles.inputError : null]}>
            <Icon name="user" size={18} color="#A0A0A0" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              value={nomeUsuario}
              onChangeText={setNomeUsuario}
            />
          </View>
          {errosFormulario.nome ? <Text style={styles.textoErro}>{errosFormulario.nome}</Text> : null}
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={[styles.inputWrapper, (errosFormulario.email || erroEmail) ? styles.inputError : null]}>
            <Icon name="mail" size={18} color="#A0A0A0" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={emailUsuario}
              onChangeText={MudancaEmail}
            />
          </View>
          {(errosFormulario.email || erroEmail) ? (
            <Text style={styles.textoErro}>{errosFormulario.email || erroEmail}</Text>
          ) : null}
        </View>

        {/* Senha */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Senha</Text>
          <View style={[styles.inputWrapper, errosFormulario.senha ? styles.inputError : null]}>
            <Icon name="lock" size={18} color="#A0A0A0" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Crie uma senha segura"
              secureTextEntry={!showPassword}
              value={senhaUsuario}
              onChangeText={setSenhaUsuario}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon name={showPassword ? "eye" : "eye-off"} size={18} color="#A0A0A0" />
            </TouchableOpacity>
          </View>
          {errosFormulario.senha ? <Text style={styles.textoErro}>{errosFormulario.senha}</Text> : null}
        </View>

        {/* Dados Pessoais */}
        <View style={styles.row}>
          <View style={[styles.inputContainer, { flex: 1, paddingHorizontal:0}]}>
            <Text style={styles.inputLabel}>Idade</Text>
            <View style={[styles.inputWrapper, errosFormulario.idade ? styles.inputError : null]}>
              <TextInput
                style={styles.input}
                placeholder="Anos"
                keyboardType="numeric"
                value={idadeUsuario}
                onChangeText={setIdadeUsuario}
              />
            </View>
            {errosFormulario.idade ? <Text style={styles.textoErro}>{errosFormulario.idade}</Text> : null}
          </View>

          <View style={[styles.inputContainer, { flex: 1, paddingHorizontal:0}]}>
            <Text style={styles.inputLabel}>Altura (m)</Text>
            <View style={[styles.inputWrapper, errosFormulario.altura ? styles.inputError : null]}>
              <TextInput
                style={styles.input}
                placeholder="Ex: 1.75"
                keyboardType="numeric"
                value={alturaUsuario}
                onChangeText={setAlturaUsuario}
              />
            </View>
            {errosFormulario.altura ? <Text style={styles.textoErro}>{errosFormulario.altura}</Text> : null}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Peso (kg)</Text>
          <View style={[styles.inputWrapper, errosFormulario.peso ? styles.inputError : null]}>
            <TextInput
              style={styles.input}
              placeholder="Ex: 68.5"
              keyboardType="numeric"
              value={pesoUsuario}
              onChangeText={setPesoUsuario}
            />
          </View>
          {errosFormulario.peso ? <Text style={styles.textoErro}>{errosFormulario.peso}</Text> : null}
        </View>

        <TouchableOpacity style={styles.btnEnviar} onPress={handleEnviar}>
          <Text style={styles.btnText}>CADASTRAR</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Já tem uma conta? 
            <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}> Faça login</Text>
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent:'center',
    backgroundColor: '#fff',
  },

  cardImg: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cardAdcImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#fff',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  inputIcon: {
    marginRight: 10,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    outlineStyle: 'none',
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap:2
  },
  btnEnviar: {
    backgroundColor: '#32A017',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  loginText: {
    fontSize: 16,
    color: '#333',
  },
  loginLink: {
    color: '#32A017',
    fontWeight: 'bold',
  },
  textoErro: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});