import { StatusBar } from "expo-status-bar";
import { Text, View, Button, Animated } from "react-native";
import styles from './styles';
import { useState, useEffect, useRef } from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SwitchSelector from "react-native-switch-selector";
export default function Cadastro3({navigation}) {
    const [temEnfermidade, setTemEnfermidade] = useState("SIM");
    const animatedOpacity = useRef(new Animated.Value(1)).current; // Inicialmente invisível

    const options = [
        { label: "SIM", value: "SIM", activeColor:'green'},
        { label: "NÃO", value: "NÃO",     activeColor:'#CD1C1CC9'}
    ];
    useEffect(() => {
        // Sempre que o usuário mudar a opção, animamos a opacidade
        Animated.timing(animatedOpacity, {
            toValue: temEnfermidade === "SIM" ? 1 : 0, // 1 para aparecer, 0 para desaparecer
            duration: 250, // Tempo da animação em ms
            useNativeDriver: true, 
        }).start();
    }, [temEnfermidade]);

    //https://www.npmjs.com/package/react-native-switch-selector?activeTab=readme         link do switchselector caso seja util
    // aqui é pra caso eu queira usar um botao com cor diferente, no switchselector eu coloco buttonColor={colors.vermelho}
   // const colors = {
     //   vermelho : 'red',
       // verde : 'green'
    //}
    return (
        <View style={styles.container}>
            <View style={styles.baguisParado}>
                <Text style={{ fontFamily: 'arial-bold', fontSize: 35 }}> Quase lá! </Text>
                <View style={styles.icones}>
                    <FontAwesome6 name="diamond" size={50} color="green" />
                    <MaterialCommunityIcons name="minus" size={50} color="#74FC7D" />
                    <FontAwesome6 name="diamond" size={50} color="green" />
                    <MaterialCommunityIcons name="minus" size={50} color="#74FC7D" />
                    <FontAwesome6 name="diamond" size={50} color="green" />
                </View>
            </View>
            <View style={styles.containerInputsButton}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Possui alguma enfermidade crônica? </Text>
                <SwitchSelector
                    options={options}
                    initial={0}
                    onPress={value=> setTemEnfermidade(value)}
                />

                <Animated.View style={{ opacity: animatedOpacity }}>
                    <View style={styles.enfermidades}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Qual(ais)?</Text>
                        <Button title="DIABETES" color="#CD1C1CC9" />
                        <Button title="HIPERTENSÃO" color="#CD1C1CC9" />
                  </View>
                </Animated.View>
            
       

                <View >
                <Button title="PROXIMO" onPress={() => navigation.navigate('IMC')} color="green"  />
                <Text style={{color:'#615D5D'}}>Ao avançar, você concorda com os termos de conduta da nossa empresa.</Text>
                </View>

            </View>
            <StatusBar style="auto" />
        </View>
    );
}