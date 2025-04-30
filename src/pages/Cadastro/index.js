import { StatusBar } from "expo-status-bar";
import { Text, View, Button, TextInput } from "react-native";
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import axios from 'axios';

export default function Cadastro({ navigation }) {
   

    return (
        <View style={styles.container}>
            <View style={styles.baguisParado}> 
                <Text style={{ fontFamily: 'arial-bold', fontSize: 35 }}> Primeira vez aqui?</Text>
                <View style={styles.icones}>
                    <FontAwesome6 name="diamond" size={50} color="green" />
                    <MaterialCommunityIcons name="minus" size={50} color="#D9D9D9" />
                    <FontAwesome6 name="diamond" size={50} color="#D9D9D9" />
                    <MaterialCommunityIcons name="minus" size={50} color="#D9D9D9" />
                    <FontAwesome6 name="diamond" size={50} color="#D9D9D9" />
                </View>
            </View>

            <View style={styles.containerInputsButton}>
                <Text style={{ fontSize: 20, fontWeight:'bold' }}>Nome: </Text>
                <TextInput style={{ borderColor: 'black', borderWidth: 1, height: 35 }} />

                <Text style={{ fontSize: 20, fontWeight:'bold' }}>Data de Nascimento:</Text>
                <TextInput  style={{ borderColor: 'black', borderWidth: 1, height: 35 }} />

                <Text style={{ fontSize: 20, fontWeight:'bold' }}>Gênero: </Text>
                <Picker
                    style={{ marginBottom: 5, backgroundColor: 'white', borderWidth: 1, borderColor: 'black', height: 55 }}
                >
                    <Picker.Item label="Selecione uma opção..." value="" enabled={false} />
                    <Picker.Item label="Masculino" value="Masculino" />
                    <Picker.Item label="Feminino" value="Feminino" />
                </Picker>

                <Button
                    title="PRÓXIMO"
                    color="green"
                    onPress={() => {
                        navigation.navigate('Cadastro2');
                    }}
                />
                <Text style={{ color: '#615D5D' }}>
                    Ao avançar, você concorda com os termos de conduta da nossa empresa.
                </Text>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}
