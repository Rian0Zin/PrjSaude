import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
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

export default function LoginReal({ navigation }) {
  const [emailUsuario, setEmailUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errosFormulario, setErrosFormulario] = useState({
    email: '',
    senha: ''
  });

  // Validação de email básica
  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Valida todos os campos
  function validarFormulario() {
    const erros = {
      email: !emailUsuario.trim() ? 'Email é obrigatório' : !validarEmail(emailUsuario) ? 'Email inválido' : '',
      senha: !senhaUsuario.trim() ? 'Senha é obrigatória' : ''
    };

    setErrosFormulario(erros);
    return !Object.values(erros).some(erro => erro !== '');
  }

  const handleLogin = async () => {
    if (!validarFormulario()) {
      return;
    }

    try {
      const response = await api.post('/login', {
        emailUsuario,
        senhaUsuario
      });

      const usuario = response.data.usuario || response.data.data;
      
      await AsyncStorage.setItem('usuario', JSON.stringify(usuario));

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );

    } catch (error) {
      console.error('Erro no login:', error);
      let errorMessage = 'Credenciais inválidas';
      
      if (error.response) {
        errorMessage = error.response.data?.mensagem || 
                      error.response.data?.message ||
                      error.response.statusText;
      }
      
      Alert.alert('Erro', errorMessage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <SafeAreaView style={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.titulo}>Bem-vindo de volta!</Text>
          <Text style={styles.subtitulo}>Faça login para continuar</Text>
        </View>

        {/* Formulário */}
        <View style={styles.formContainer}>
          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={[styles.inputWrapper, errosFormulario.email ? styles.inputError : null]}>
              <Icon name="mail" size={18} color="#A0A0A0" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={emailUsuario}
                onChangeText={setEmailUsuario}
              />
            </View>
            {errosFormulario.email ? <Text style={styles.textoErro}>{errosFormulario.email}</Text> : null}
          </View>

          {/* Senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Senha</Text>
            <View style={[styles.inputWrapper, errosFormulario.senha ? styles.inputError : null]}>
              <Icon name="lock" size={18} color="#A0A0A0" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
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
            <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
                <Text style={styles.btnText}>ENTRAR</Text>
            </TouchableOpacity>
          </View>


          {/* Link para Registro */}
          <View style={styles.registroContainer}>
            <Text style={styles.registroText}>Não tem uma conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
              <Text style={styles.registroLink}> Criar conta</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
    paddingHorizontal:20,
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
    marginBottom: 8,
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
  btnLogin: {
    backgroundColor: '#32A017',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registroContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registroText: {
    color: '#666',
  },
  registroLink: {
    color: '#32A017',
    fontWeight: 'bold',
  },
  textoErro: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});