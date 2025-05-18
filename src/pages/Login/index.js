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
import React, { useState, useEffect } from 'react';
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

export default function Registro({ navigation, route }) {
  const { usuarioParaEditar } = route.params || {};
  
  // Estados
  const [imageUri, setImageUri] = useState('https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  const [idadeUsuario, setIdadeUsuario] = useState('');
  const [alturaUsuario, setAlturaUsuario] = useState('');
  const [pesoUsuario, setPesoUsuario] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [idUsuario, setIdUsuario] = useState(null);
  const [errosFormulario, setErrosFormulario] = useState({
    nome: '',
    email: '',
    senha: '',
    idade: '',
    altura: '',
    peso: ''
  });
  const [erroEmail, setErroEmail] = useState('');

  // Carregar dados do usuário se estiver editando
  useEffect(() => {
    if (usuarioParaEditar) {
      setImageUri(usuarioParaEditar.fotoUsuario 
        ? `http://127.0.0.1:8081/img/fotoUsuario/${usuarioParaEditar.fotoUsuario}`
        : 'https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png');
      setNomeUsuario(usuarioParaEditar.nomeUsuario || '');
      setEmailUsuario(usuarioParaEditar.emailUsuario || '');
      setIdadeUsuario(usuarioParaEditar.idadeUsuario?.toString() || '');
      setAlturaUsuario(usuarioParaEditar.alturaUsuario?.toString() || '');
      setPesoUsuario(usuarioParaEditar.pesoUsuario?.toString() || '');
      setIdUsuario(usuarioParaEditar.idUsuario || null);
      
      navigation.setOptions({
        title: 'Editar Perfil'
      });
    } else {
      navigation.setOptions({
        title: 'Cadastro'
      });
    }
  }, [route.params?.usuarioParaEditar]);

  // Função para verificar email existente (exceto para o próprio usuário em edição)
  async function verificarEmailExistente(email) {
    try {
      const resposta = await api.get(`/verificar-email?email=${email}${idUsuario ? `&idUsuario=${idUsuario}` : ''}`);
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
      senha: !usuarioParaEditar && !senhaUsuario.trim() ? 'Senha é obrigatória' : '',
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

  const handleChooseImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.7,
      });

      if (result.didCancel) {
        console.log('Cancelado pelo usuário');
      } else if (result.errorCode) {
        console.log('Erro: ', result.errorMessage);
      } else if (result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
    }
  };

  const handleEnviar = async () => {
    if (!validarFormulario()) {
      return;
    }

    // Se for edição, não precisa verificar email novamente
    if (!usuarioParaEditar) {
      const emailExiste = await verificarEmailExistente(emailUsuario);
      if (emailExiste) {
        Alert.alert('Cadastro não realizado', 'Este email já está cadastrado!');
        return;
      }
    }

    const idade = parseInt(idadeUsuario);
    const altura = parseFloat(alturaUsuario);
    const peso = parseFloat(pesoUsuario);

    let fotoBase64 = null;
    if (imageUri && !imageUri.startsWith('http://127.0.0.1:8081')) {
      try {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        fotoBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error('Erro na conversão da imagem:', error);
        Alert.alert('Erro', 'Falha ao processar a imagem');
        return;
      }
    }

    const dados = {
      nomeUsuario,
      emailUsuario,
      ...(!usuarioParaEditar && { senhaUsuario }),
      idadeUsuario: idade,
      alturaUsuario: altura,
      pesoUsuario: peso,
      fotoBase64: fotoBase64 || null,
      ...(usuarioParaEditar && { fotoUsuario: usuarioParaEditar.fotoUsuario })
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      let response;
      if (usuarioParaEditar) {
        response = await api.post(`/usuario/${idUsuario}`, dados, config);
      } else {
        response = await api.post('/usuario', dados, config);
      }

      console.log('Resposta completa da API:', response.data); // Log para debug

      // Verificação mais flexível da resposta
      let usuarioResposta;
      
      if (response.data.data) {
        // Caso 1: Resposta com estrutura { data: { ... } }
        usuarioResposta = response.data.data;
      } else if (response.data.usuario) {
        // Caso 2: Resposta com estrutura { usuario: { ... } }
        usuarioResposta = response.data.usuario;
      } else if (response.data.idUsuario) {
        // Caso 3: Resposta direta com os dados do usuário
        usuarioResposta = response.data;
      } else {
        throw new Error('Estrutura da resposta não reconhecida');
      }

      const usuarioParaSalvar = {
        idUsuario: usuarioResposta.idUsuario || idUsuario,
        nomeUsuario: usuarioResposta.nomeUsuario || nomeUsuario,
        emailUsuario: usuarioResposta.emailUsuario || emailUsuario,
        idadeUsuario: usuarioResposta.idadeUsuario || idade,
        alturaUsuario: usuarioResposta.alturaUsuario || altura,
        pesoUsuario: usuarioResposta.pesoUsuario || peso,
        fotoUsuario: usuarioResposta.fotoUsuario || (usuarioParaEditar?.fotoUsuario || null)
      };

      setIdUsuario(usuarioResposta.idUsuario || idUsuario);
      
      await AsyncStorage.setItem('usuario', JSON.stringify(usuarioParaSalvar));

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );

    } catch (error) {
      console.error('Erro completo:', error);
      let errorMessage = 'Erro desconhecido';
      
      if (error.response) {
        // Tenta obter a mensagem de erro de várias formas possíveis
        errorMessage = error.response.data?.mensagem || 
                      error.response.data?.message ||
                      (typeof error.response.data === 'string' ? error.response.data : null) ||
                      error.response.statusText;
      } else if (error.request) {
        errorMessage = 'Sem resposta do servidor';
      } else {
        errorMessage = error.message || 'Erro ao processar a requisição';
      }
      
      Alert.alert('Erro', errorMessage || 'Ocorreu um erro inesperado');
    }
  };

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
              editable={!usuarioParaEditar} // Não permite editar email se estiver editando
            />
          </View>
          {(errosFormulario.email || erroEmail) ? (
            <Text style={styles.textoErro}>{errosFormulario.email || erroEmail}</Text>
          ) : null}
        </View>

        {/* Senha - só mostra se for cadastro novo */}
        {!usuarioParaEditar && (
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
        )}

        {/* Dados Pessoais */}
        <View style={styles.row}>
          <View style={[styles.inputContainer, { flex: 1, paddingHorizontal: 0 }]}>
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

          <View style={[styles.inputContainer, { flex: 1, paddingHorizontal: 0 }]}>
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
          <Text style={styles.btnText}>
            {usuarioParaEditar ? 'ATUALIZAR' : 'CADASTRAR'}
          </Text>
        </TouchableOpacity>

        {!usuarioParaEditar && (
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Já tem uma conta?
              <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}> Faça login</Text>
            </Text>
          </View>
        )}
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
    justifyContent: 'center',
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
    gap: 2
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