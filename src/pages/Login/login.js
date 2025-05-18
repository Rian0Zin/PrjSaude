import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
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
  const [loading, setLoading] = useState(false);
  const [erros, setErros] = useState({
    email: '',
    senha: ''
  });

  const validarFormulario = () => {
    const novosErros = {
      email: !emailUsuario ? 'Email é obrigatório' : 
        !/^\S+@\S+\.\S+$/.test(emailUsuario) ? 'Email inválido' : '',
      senha: !senhaUsuario ? 'Senha é obrigatória' : ''
    };
    
    setErros(novosErros);
    return Object.values(novosErros).every(erro => !erro);
  };

  const handleLogin = async () => {
    if (!validarFormulario()) return;

    setLoading(true);
    try {
      const { data } = await api.post('/login', {
        emailUsuario,
        senhaUsuario
      });

      if (data.sucesso) {
        await AsyncStorage.setItem('usuario', JSON.stringify(data.usuario));
        
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      } else {
        Alert.alert('Erro', data.mensagem || 'Falha no login');
      }
    } catch (error) {
      const mensagem = error.response?.data?.mensagem || 
                      error.message || 
                      'Erro de conexão';
      Alert.alert('Erro', mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Bem-vindo</Text>
          <Text style={styles.subtitulo}>Faça login para continuar</Text>
        </View>

        <View style={styles.formulario}>
          {/* Campo Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={[styles.inputWrapper, erros.email && styles.inputError]}>
              <Icon name="mail" size={18} color="#666" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="exemplo@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={emailUsuario}
                onChangeText={setEmailUsuario}
              />
            </View>
            {erros.email ? <Text style={styles.erroTexto}>{erros.email}</Text> : null}
          </View>

          {/* Campo Senha */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <View style={[styles.inputWrapper, erros.senha && styles.inputError]}>
              <Icon name="lock" size={18} color="#666" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                value={senhaUsuario}
                onChangeText={setSenhaUsuario}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon 
                  name={showPassword ? 'eye-off' : 'eye'} 
                  size={18} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
            {erros.senha ? <Text style={styles.erroTexto}>{erros.senha}</Text> : null}
          </View>

          {/* Botão de Login */}
          <TouchableOpacity
            style={[styles.botao, loading && styles.botaoDesativado]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.botaoTexto}>ENTRAR</Text>
            )}
          </TouchableOpacity>

          {/* Link para Cadastro */}
          <View style={styles.registroContainer}>
            <Text style={styles.registroTexto}>Não tem conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
              <Text style={styles.registroLink}>Cadastre-se</Text>
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
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
  },
  formulario: {
    width: '100%',
    paddingHorizontal:20
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  inputError: {
    borderColor: '#ff4444',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#333',
    outlineStyle: 'none',
  },
  eyeIcon: {
    padding: 8,
  },
  botao: {
    height: 48,
    backgroundColor: '#32A017',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  botaoDesativado: {
    opacity: 0.7,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registroContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registroTexto: {
    color: '#666',
  },
  registroLink: {
    color: '#32A017',
    fontWeight: 'bold',
  },
  erroTexto: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
  },
});