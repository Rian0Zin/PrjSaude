import React, { useState, Fragment, useCallback  } from 'react';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Picker } from 'react-native-web';
import { useFocusEffect } from '@react-navigation/native'; // ✅ IMPORTANTE
import axios from 'axios';

export default function FazerRegistroDiabete({ navigation }) {
    const [glicemia, setGlicemia] = useState('');
    const [momentoMedicaoDiabete, setMomentoMedicaoDiabete]= useState('Indiferente');
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

    const formatarHorario = (text) => {
        // Remove tudo que não é número
        let valor = text.replace(/\D/g, '');

        // Aplica a máscara
        if (valor.length > 2) {
            valor = valor.substring(0, 2) + ':' + valor.substring(2, 4);
        }

        // Validação das horas (00-23)
        if (valor.length >= 2) {
            const horas = parseInt(valor.substring(0, 2));
            if (horas > 23) {
                valor = '23' + (valor.length > 2 ? ':' + valor.substring(3) : '');
            }
        }

        // Validação dos minutos (00-59)
        if (valor.length > 3) {
            const minutos = parseInt(valor.substring(3, 5));
            if (minutos > 59) {
                valor = valor.substring(0, 3) + '59';
            }
        }

        // Limita o tamanho
        if (valor.length > 5) {
            valor = valor.substring(0, 5);
        }

        setHorario(valor);
    };

    const formatarData = (text) => {
        // Remove tudo que não é número
        let valor = text.replace(/\D/g, '');

        // Aplica a máscara
        if (valor.length > 2) {
            valor = valor.substring(0, 2) + '/' + valor.substring(2);
        }
        if (valor.length > 5) {
            valor = valor.substring(0, 5) + '/' + valor.substring(5);
        }

        // Validação do dia (1-31)
        if (valor.length >= 2) {
            const dia = parseInt(valor.substring(0, 2));
            if (dia > 31) {
                valor = '31' + (valor.length > 2 ? '/' + valor.substring(3) : '');
            } else if (dia < 1) {
                valor = '01' + (valor.length > 2 ? '/' + valor.substring(3) : '');
            }
        }

        // Validação do mês (1-12)
        if (valor.length >= 5) {
            const mes = parseInt(valor.substring(3, 5));
            if (mes > 12) {
                valor = valor.substring(0, 3) + '12' + (valor.length > 5 ? '/' + valor.substring(6) : '');
            } else if (mes < 1) {
                valor = valor.substring(0, 3) + '01' + (valor.length > 5 ? '/' + valor.substring(6) : '');
            }
        }

        // Validação do ano (até 2025)
        if (valor.length >= 10) {
            const ano = parseInt(valor.substring(6, 10));
            if (ano > 2025) {
                valor = valor.substring(0, 6) + '2025';
            }
        }

        // Limita o tamanho
        if (valor.length > 10) {
            valor = valor.substring(0, 10);
        }

        setData(valor);
    };

    async function CriarRegistroGlicemia() {
        try {
            if (!glicemia && !momentoMedicaoDiabete) {
                alert('Por favor, preencha todos os campos obrigatórios!');
                return;
            }

            // Verifica se a hora está completa
            if (horario.length < 5 || horario.indexOf(':') === -1) {
                alert('Por favor, insira uma hora válida no formato HH:MM');
                return;
            }

            // Verifica se a data está completa
            if (data.length < 10 || data.split('/').length !== 3) {
                alert('Por favor, insira uma data válida no formato DD/MM/AAAA');
                return;
            }

            const url = 'http://127.0.0.1:8081/api/diabetes/criar';

            const dados = {
                glicemiaDiabete: parseInt(glicemia),
                momentoMedicaoDiabete: momentoMedicaoDiabete,
                horaDiabete: horario,
                dataDiabete: data
            };

            const response = await axios.post(url, dados, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                alert('Registro salvo com sucesso!');
                navigation.goBack();
            } else {
                alert(`Erro ao salvar: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Erro detalhado:', error.response || error);
            alert(`Erro ao conectar com o servidor: ${error.message}`);
        }
    }

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
                                placeholder="HH:MM"
                                value={horario}
                                onChangeText={formatarHorario}
                            />
                            <TextInput
                                style={styles.inputData}
                                keyboardType="numeric"
                                maxLength={10}
                                placeholder="DD/MM/AAAA"
                                value={data}
                                onChangeText={formatarData}
                            />
                        </View>
                    </View>
                    <View style={styles.telaInputGlicemiaPasso2}>
                        <Text style={styles.tituloRefeicao}> Quando foi feita esta medição? </Text>
                        <Picker style={styles.pickerRefeicao}  selectedValue={momentoMedicaoDiabete} onValueChange={(itemValue) => setMomentoMedicaoDiabete(itemValue)} >
                            <Picker.Item label="Indiferente" value="Indiferente" />
                            <Picker.Item label="Pré refeição" value="Pré refeição" />
                            <Picker.Item label="Pós refeição" value="Pós refeição" />
                            <Picker.Item label="Jejum" value="Jejum" />
                            <Picker.Item label="Aperitivos" value="Aperitivos" />
                            <Picker.Item label="Ao deitar" value="Ao deitar" />
                        </Picker>
                    </View>
                    <View style={styles.viewBotaoAdicionar}>
                        <TouchableOpacity onPress={CriarRegistroGlicemia} style={styles.botaoAdicionar}>
                            <Text>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </Fragment>
            )}
        </SafeAreaView>
    );
}