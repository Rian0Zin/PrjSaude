import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import styles from './styles';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from "react-native-safe-area-context";

export default function IMC({navigation}) {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [imc, setImc] = useState('');
    const [categoria, setCategoria] = useState('');

    //useEffect faz com que ele execute uma função ou outra parada assim que o componente é renderizado
    useEffect(() => {
        //dentro do useeffect eu criei a função, e assim que finalizei ela, já executei ela 
        const chamarDadosSalvos = async () => {
            const dados = await AsyncStorage.getItem('usuario');
            const infosUsuario = JSON.parse(dados);
            const pesoSalvo = infosUsuario.pesoUsuario;
            const alturaSalva = infosUsuario.alturaUsuario;
            setPeso(pesoSalvo);
            setAltura(alturaSalva);
            const pesoImc = parseFloat(pesoSalvo);
            const altImc = parseFloat(alturaSalva);

            if (!isNaN(pesoImc) && !isNaN(altImc) && altImc > 0) {
                const calculoImc = (pesoImc / (altImc ** 2)).toFixed(2);
                setImc(calculoImc);
               //definirCategoria(calculoImc);
            }
        };
        chamarDadosSalvos();

    //Dentro deste [], está a quantidade de vezes que o useeffect ser executado. caso n tenha nada, será uma única vez, mas dá pra colocar uma variavel em laço para poder controlar as execuçoes 
    }, []);

    useEffect(() => {
        if (imc) {
            definirCategoriaIMC(imc);
        }
    }, [imc]);

    const definirCategoriaIMC = (imc) =>{
        if (imc<18.5){
            setCategoria('Abaixo do peso');
        }
        else if (imc>=18.5 && imc<24.9){
            setCategoria('Peso ideal');
        }
        else if (imc>=24.9 && imc<29.9){
            setCategoria('Sobrepeso');
        }
        else if (imc>=29.9 && imc<34.9){
            setCategoria('Obesidade Grau 1');
        }
        else if (imc>=34.9 && imc<39) {
            setCategoria('Obesidade Grau 2');
        }
        else {
            setCategoria('Obesidade Grau 3');
        }
    }

    const definirImagemIMC = () => {
        switch(categoria){
            case "Abaixo do peso":
                return require('../../../assets/imcAbaixoPeso.png');
            case "Peso ideal": 
                return require('../../../assets/imcPesoIdeal.png');
            case "Sobrepeso":
                return require('../../../assets/imcSobrepeso.png');
            case "Obesidade Grau 1":
                return require('../../../assets/imcObesidade1.png');
            case "Obesidade Grau 2":
                return require('../../../assets/imcObesidade2.png');
            case "Obesidade Grau 3":
                return require('../../../assets/imcObesidade3.png');
            };
    }
    
    const definirGraficoIMC = () =>{
        switch(categoria){
            case "Abaixo do peso":
                return require('../../../assets/graficoIMCAzul.png');
            case "Peso ideal":
            case "Sobrepeso":
                return require('../../../assets/graficoIMC.png');
            case "Obesidade Grau 1":
                return require('../../../assets/graficoIMCAmarelo.png');
            case "Obesidade Grau 2":
                return require('../../../assets/graficoIMCLaranja.png');
            case "Obesidade Grau 3":
                return require('../../../assets/graficoIMCVermelho.png');
        };
    }
    

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ width: '100%', bottom:'11%' }}>
            <Image
                source={definirGraficoIMC()}
                style={{ width: '100%', height: 250, resizeMode: 'contain' }} // Ajuste a altura conforme necessário
            />
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={definirImagemIMC()} style={{ width: '100%', height: 300, resizeMode: "contain" }} />
            
            <View style={{alignItems:'center', gap:3}}>
            <Text style={{color: cores[categoria], fontSize:30}}> {categoria} </Text>
            <Text style={{fontSize:20}}>Seu peso atual: {peso} KG</Text>
            <Text style={{fontSize:20}}>Sua altura: {altura}</Text>
            <Text style={{fontSize:20}}>Seu IMC: </Text>
            <Text style={{color: cores[categoria], fontSize:50 }}> {imc} </Text>
            </View>
      
        </View>

        <StatusBar style="auto" />
    </SafeAreaView>
);
}

const cores = {
    "Abaixo do peso": "#3498db", // Azul
    "Peso ideal": "#2ecc71", // Verde
    "Sobrepeso": "#f1c40f", // Amarelo
    "Obesidade Grau 1": "#F7D917", // Laranja
    "Obesidade Grau 2": "#e67e22", // Laranja escuro
    "Obesidade Grau 3": "#c0392b", // Vermelho
};