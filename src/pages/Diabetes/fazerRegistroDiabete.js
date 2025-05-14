import React, { useState, Fragment, useCallback  } from 'react';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Picker } from 'react-native-web';
import { useFocusEffect } from '@react-navigation/native'; // ✅ IMPORTANTE

export default function FazerRegistroDiabete({ navigation }) {
    const [glicemia, setGlicemia] = useState('');
    const [passo, setPasso] = useState(0);
    const [horario, setHorario] = useState('');
    const [data, setData] = useState('');

    // 🔁 Sempre que a tela for aberta, volta para o passo 0
    useFocusEffect(
        useCallback(() => {
            setPasso(0);
            setGlicemia('');
            setHorario('');
            setData('');
        }, [])
    );

    const adicionarNumero = (num) => {
        if (glicemia.length < 3) {
            setGlicemia(glicemia + num);
        }
    };

    const apagarUltimo = () => {
        setGlicemia(glicemia.slice(0, -1));
    };

    const formatarHorario = (texto) => {
        const numeros = texto.replace(/\D/g, '');
        let formatado = '';

        if (numeros.length <= 2) {
            formatado = numeros;
        } else if (numeros.length <= 4) {
            formatado = `${numeros.slice(0, 2)}:${numeros.slice(2)}`;
        } else {
            formatado = `${numeros.slice(0, 2)}:${numeros.slice(2, 4)}`;
        }

        setHorario(formatado);
    };

    const formatarData = (texto) => {
        const numeros = texto.replace(/\D/g, '');
        let formatado = '';

        if (numeros.length <= 2) {
            formatado = numeros;
        } else if (numeros.length <= 4) {
            formatado = `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
        } else {
            formatado = `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4, 8)}`;
        }

        setData(formatado);
    };

    return (
        <SafeAreaView style={styles.container}>
            {passo === 0 && (
                <Fragment>
                    <View style={styles.telaInputGlicemia}>
                        <Text style={styles.tituloInputGlicemia}>Glicemia</Text>
                        <Text style={styles.glicemia}>{glicemia || '---'}</Text>
                        <Text style={styles.medidaInputGlicemia}> mg/dL </Text>
                    </View>
                    <View style={styles.teclado}>
                        {[
                            ['1', '2', '3'],
                            ['4', '5', '6'],
                            ['7', '8', '9'],
                            ['0', 'apagar'],
                        ].map((linha, index) => (
                            <View key={index} style={styles.linha}>
                                {linha.map((item) => (
                                    <TouchableOpacity
                                        key={item}
                                        onPress={() =>
                                            item === 'apagar' ? apagarUltimo() : adicionarNumero(item)
                                        }
                                        style={styles.botao}
                                    >
                                        <Text style={styles.botaoTexto}>
                                            {item === 'apagar' ? '⌫' : item}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
                    </View>
                    <View style={styles.viewBotaoAdicionar}>
                        <TouchableOpacity onPress={() => setPasso(1)} style={styles.botaoAdicionar}>
                            <Text>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                </Fragment>
            )}

            {passo === 1 && (
                <Fragment>
                    <View style={styles.telaInputGlicemiaPasso2}>
                        <Text style={styles.tituloInputGlicemia}>Glicemia</Text>
                        <Text style={styles.glicemia}>{glicemia || '---'}</Text>
                        <Text style={styles.medidaInputGlicemia}> mg/dL </Text>
                        <View style={styles.inputsHoraDia}>
                            <TextInput
                                style={styles.inputHorario}
                                keyboardType="numeric"
                                maxLength={5}
                                placeholder="00:00"
                                value={horario}
                                onChangeText={formatarHorario}
                            />
                            <TextInput
                                style={styles.inputData}
                                keyboardType="numeric"
                                maxLength={10}
                                placeholder="dd/mm/aaaa"
                                value={data}
                                onChangeText={formatarData}
                            />
                        </View>
                    </View>
                    <View style={styles.telaInputGlicemiaPasso2}>
                        <Text style={styles.tituloRefeicao}> Quando foi feita esta medição? </Text>
                        <Picker style={styles.pickerRefeicao}>
                            <Picker.Item label="Indiferente" value="Indiferente" />
                            <Picker.Item label="Pré refeição" value="Pré refeição" />
                            <Picker.Item label="Pós refeição" value="Pós refeição" />
                            <Picker.Item label="Jejum" value="Jejum" />
                            <Picker.Item label="Aperitivos" value="Aperitivos" />
                            <Picker.Item label="Ao deitar" value="Ao deitar" />
                        </Picker>
                    </View>
                    <View style={styles.viewBotaoAdicionar}>
                        <TouchableOpacity onPress={() => setPasso(1)} style={styles.botaoAdicionar}>
                            <Text>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </Fragment>
            )}
        </SafeAreaView>
    );
}
