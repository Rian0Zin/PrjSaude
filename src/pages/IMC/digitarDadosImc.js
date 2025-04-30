import { StatusBar } from "expo-status-bar";
import { Text, View, Pressable, Button, TextInput } from "react-native";
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DigitarDadosImc({ navigation }) {

    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');


    const salvarDados = async () => {

        try {
            await AsyncStorage.setItem('peso', peso);
            await AsyncStorage.setItem('altura', altura);
            navigation.navigate('resultadoImc');
            console.log('tá salvo ladrão')
        } catch (error) {
            console.error("Erro ao salvar os dados", error);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.baguisParado}>
                <Text style={{ fontFamily: 'arial-bold', fontSize: 35 }}> Digite suas informações. </Text>
                <View style={styles.icones}>
                    {/*                    <FontAwesome6 name="diamond" size={50} color="green" />*/}
                    {/*  <MaterialCommunityIcons name="minus" size={50} color="#74FC7D" />*/}
                             <FontAwesome6 name="diamond" size={50} color="green" />
                    {/*            <MaterialCommunityIcons name="minus" size={50} color="#D9D9D9" />*/}                    
{/*                    <FontAwesome6 name="diamond" size={50} color="#D9D9D9" /> */}   
             </View>
            </View>
            <View style={styles.containerInputsButton}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Peso: </Text>
                <TextInput value={peso} onChangeText={setPeso} style={{ borderRadius: 1, borderColor: 'black', borderWidth: 1, height: 35 }} />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Altura:</Text>
                <TextInput value={altura} onChangeText={setAltura} style={{ borderRadius: 1, borderColor: 'black', borderWidth: 1, height: 35 }} />
                <Button title="PROXIMO" color="green" onPress={salvarDados} size={1000} />
                <Text style={{ color: '#615D5D' }}>Ao avançar, você concorda com os termos de conduta da nossa empresa.</Text>

            </View>
            <StatusBar style="auto" />
        </View>
    );
}