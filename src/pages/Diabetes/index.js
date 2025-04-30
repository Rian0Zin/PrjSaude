import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

//
export default function Teste() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [estado, setEstado] = useState('');
  const [uf, setUf] = useState('');
  const [regiao, setRegiao] = useState('');

  const dados ={
    nomeUsuario:'bosta'
    
  }

  const carregar = async () => {
    
   await axios.post('http://127.0.0.1:8000/api/criar', dados)
    //await axios.get('https://viacep.com.br/ws/01001000/json/')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Digite o Cep:</Text>
      <TextInput
        style={styles.input}
        placeholder="Escreva aqui"
        value={cep}
        onChangeText={setCep}
      />
      <Button title="Mostrar mensagem" onPress={()=>{carregar()}} />
       <Text style={styles.mensagem}>Endereco:  {endereco}</Text>
       <Text style={styles.mensagem}>Bairro:  {bairro}</Text>
       <Text style={styles.mensagem}>Estado:  {estado}</Text>
       <Text style={styles.mensagem}>UF:  {uf}</Text>
       <Text style={styles.mensagem}>Região:  {regiao}</Text>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#999',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  mensagem: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },
});
