import { StatusBar } from "expo-status-bar";
import { Text, View, Button, TextInput, Image, Pressable, Animated } from "react-native";
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { useState, useRef, useEffect } from "react";
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import SwitchSelector from "react-native-switch-selector";

export default function Cadastro({ navigation }) {
    const [userImg, setUserImg] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBv0SVKr1BMPva0yRaatSIiy3wAz7giXZmPQ&s');
    const [passo, setPasso] = useState(0);
    async function fotoPerfil() {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setUserImg(result.assets[0].uri);
        }
    } const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');

    const salvarDados = async () => {

        try {
            await AsyncStorage.setItem('peso', peso);
            await AsyncStorage.setItem('altura', altura);
            navigation.navigate('Cadastro3');
            console.log('tá salvo ladrão')
        } catch (error) {
            console.error("Erro ao salvar os dados", error);
        }
    };
    const [temEnfermidade, setTemEnfermidade] = useState("SIM");
    const animatedOpacity = useRef(new Animated.Value(1)).current; // Inicialmente invisível

    const options = [
        { label: "SIM", value: "SIM", activeColor: 'green' },
        { label: "NÃO", value: "NÃO", activeColor: '#CD1C1CC9' }
    ];
    useEffect(() => {
        // Sempre que o usuário mudar a opção, animamos a opacidade
        Animated.timing(animatedOpacity, {
            toValue: temEnfermidade === "SIM" ? 1 : 0, // 1 para aparecer, 0 para desaparecer
            duration: 250, // Tempo da animação em ms
            useNativeDriver: true,
        }).start();
    }, [temEnfermidade]);

    return (
        <View style={styles.container}>
            {passo === 0 && (
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
                    <View style={styles.imgPerfilRow}>
                        <Pressable onPress={() => fotoPerfil()}>
                            <Image style={styles.user} source={{ uri: userImg }} />
                        </Pressable>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Clique na imagem para tirar uma foto de perfil.</Text>
                    </View>
                    <View style={styles.containerInputsButton}>

                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Nome completo: </Text>
                        <TextInput style={{ borderColor: 'black', borderWidth: 1, height: 35 }} />

                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Email:</Text>
                        <TextInput style={{ borderColor: 'black', borderWidth: 1, height: 35 }} />

                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Senha: </Text>
                        <TextInput style={{ borderColor: 'black', borderWidth: 1, height: 35 }} />


                        <Button
                            title="PRÓXIMO"
                            color="green"
                            onPress={() => {
                                setPasso(1);
                            }}
                        />
                        <Text style={{ color: '#615D5D' }}>
                            Ao avançar, você concorda com os termos de conduta da nossa empresa.
                        </Text>
                    </View>
                </View>
            )}
            {passo === 1 && (
                <View style={styles.container}>            <View style={styles.baguisParado}>
                    <Text style={{ fontFamily: 'arial-bold', fontSize: 35 }}> Meio caminho andado! </Text>
                    <View style={styles.icones}>
                        <FontAwesome6 name="diamond" size={50} color="green" />
                        <MaterialCommunityIcons name="minus" size={50} color="#74FC7D" />
                        <FontAwesome6 name="diamond" size={50} color="green" />
                        <MaterialCommunityIcons name="minus" size={50} color="#D9D9D9" />
                        <FontAwesome6 name="diamond" size={50} color="#D9D9D9" />
                    </View>
                </View>
                    <View style={styles.containerInputsButton}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Sexo: </Text>
                        <Picker style={{ marginBottom: 5, backgroundColor: 'white', borderWidth: 1, borderColor: 'black', height: 55 }}>
                            <Picker.Item label="Selecione uma opção..." value="" enabled={false} />
                            <Picker.Item label="Masculino" value="Masculino" />
                            <Picker.Item label="Feminino" value="Feminino" />
                        </Picker>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Data de nascimento:</Text>
                        <TextInput style={{ borderRadius: 1, borderColor: 'black', borderWidth: 1, height: 35 }} />
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Altura:</Text>
                        <TextInput value={altura} onChangeText={setAltura} style={{ borderRadius: 1, borderColor: 'black', borderWidth: 1, height: 35 }} />
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Peso:</Text>
                        <TextInput value={peso} onChangeText={setPeso} style={{ borderRadius: 1, borderColor: 'black', borderWidth: 1, height: 35 }} />
                        <Button title="PROXIMO" color="green" onPress={() => { setPasso(2) }} size={1000} />
                        <Text style={{ color: '#615D5D' }}>Ao avançar, você concorda com os termos de conduta da nossa empresa.</Text>

                    </View></View>
            )}
            {passo === 2 && (
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
                            onPress={value => setTemEnfermidade(value)}
                        />
                        {temEnfermidade === "SIM" && (
                            <Animated.View style={{ opacity: animatedOpacity }}>
                                <View style={styles.enfermidades}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Qual(ais)?</Text>
                                    <Button title="DIABETES" color="#CD1C1CC9" />
                                    <Button title="HIPERTENSÃO" color="#CD1C1CC9" />
                                </View>
                            </Animated.View>
                        )}



                        <View >
                            <Button title="PROXIMO" onPress={() => navigation.navigate('IMC')} color="green" />
                            <Text style={{ color: '#615D5D' }}>Ao avançar, você concorda com os termos de conduta da nossa empresa.</Text>
                        </View>

                    </View>
                    <StatusBar style="auto" />
                </View>
            )}
            <StatusBar style="auto" />
        </View>
    );
}
