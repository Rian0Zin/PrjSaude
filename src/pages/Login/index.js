import { StatusBar } from "expo-status-bar";
import { Text, View, Button, TextInput, Pressable } from "react-native";
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import axios from 'axios';

export default function Login({ navigation }) {
   

    return (
        <View style={styles.container}>
            <View style={styles.baguisParado}> 
                <Text style={{ fontFamily: 'arial-bold', fontSize: 35 }}> Login</Text>
            </View>

            <View style={styles.containerInputsButton}>
                <Text style={{ fontSize: 20, fontWeight:'bold' }}>Email: </Text>
                <TextInput style={{ borderColor: 'black', borderWidth: 1, height: 35 }} />

                <Text style={{ fontSize: 20, fontWeight:'bold' }}>Senha:</Text>
                <TextInput  style={{ borderColor: 'black', borderWidth: 1, height: 35 }} />

                <Button
                    title="Avançar"
                    color="green"
                    onPress={() => {
                        navigation.navigate('Cadastro2');
                    }}
                />
                <Text style={{ color: '#615D5D' }}>
                   Esqueceu a senha? 
                </Text>
                <Text style={{ color: '#615D5D' }}>
                   Sua primeira vez aqui? < Pressable onPress={()=> {navigation.navigate('Cadastro')}}> Cadastre-se </Pressable> 
                </Text>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}
