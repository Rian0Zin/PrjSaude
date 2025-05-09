import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    TextInput,
    Pressable,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import React, { useState } from 'react';
import DropdownComponent from '../../Components/Dropdown';
import MultiSelect from '../../Components/MultiSelect';
import { launchImageLibrary } from 'react-native-image-picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default function DigitarDadosRemedio({ navigation }) {
    const [imageUri, setImageUri] = useState(null);
    const [quantidade, setQuantidade] = useState('1');
    const [tipoSelecionado, setTipoSelecionado] = useState(null);
    const [duracaoRaw, setDuracaoRaw] = useState('');
    const [frequenciaRaw, setFrequenciaRaw] = useState('');
    const [nomeMedicamento, setNomeMedicamento] = useState('');

    const handleChooseImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 0.7,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('Cancelado pelo usuário');
                } else if (response.errorCode) {
                    console.log('Erro: ', response.errorMessage);
                } else if (response.assets && response.assets.length > 0) {
                    setImageUri(response.assets[0].uri);
                }
            }
        );
    };

    const incrementar = () => {
        const valor = parseInt(quantidade) || 0;
        setQuantidade(String(valor + 1));
    };

    const decrementar = () => {
        const valor = parseInt(quantidade) || 0;
        if (valor > 1) {
            setQuantidade(String(valor - 1));
        }
    };

    const formatarDuracao = (dias) => {
        const numDias = parseInt(dias);
        if (isNaN(numDias)) return '';

        if (numDias < 365) return `${numDias} dias`;

        const anos = Math.floor(numDias / 365);
        const resto = numDias % 365;
        if (resto === 0) return `${anos} ano${anos > 1 ? 's' : ''}`;
        if (resto < 30) return `${anos} ano${anos > 1 ? 's' : ''} e ${resto} dia${resto > 1 ? 's' : ''}`;

        const meses = Math.floor(resto / 30);
        return `${anos} ano${anos > 1 ? 's' : ''} e ${meses} mês${meses > 1 ? 'es' : ''}`;
    };

    const enviarParaAPI = async () => {
        if (!nomeMedicamento.trim()) {
            Alert.alert('Erro', 'Preencha o nome do medicamento.');
            return;
        }

        if (!quantidade || parseInt(quantidade) <= 0) {
            Alert.alert('Erro', 'A quantidade deve ser maior que zero.');
            return;
        }

        if (!tipoSelecionado) {
            Alert.alert('Erro', 'Selecione o tipo de medicação.');
            return;
        }

        if (!duracaoRaw || parseInt(duracaoRaw) <= 0) {
            Alert.alert('Erro', 'Informe a duração do tratamento.');
            return;
        }

        if (!frequenciaRaw || parseInt(frequenciaRaw) <= 0) {
            Alert.alert('Erro', 'Informe a frequência da medicação.');
            return;
        }

        try {
            const formData = new FormData();

            if (imageUri) {
                formData.append('imagem', {
                    uri: imageUri,
                    name: 'remedio.jpg',
                    type: 'image/jpeg',
                });
            }

            formData.append('nome', nomeMedicamento);
            formData.append('quantidade', quantidade);
            formData.append('tipo', tipoSelecionado);
            formData.append('duracao', duracaoRaw);
            formData.append('frequencia', frequenciaRaw);

            const response = await axios.post('https://suaapi.com/remedios', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Alert.alert('Sucesso', 'Medicamento cadastrado com sucesso!');
            navigation.goBack();

        } catch (error) {
            console.error('Erro ao enviar:', error);
            Alert.alert('Erro', 'Falha ao enviar os dados.');
        }
    };

    const tiposMedicacao = [
        { id: 'Pilula', icon: 'pills' },
        { id: 'Comprimido', icon: 'drug-pack' },
        { id: 'Xarope', icon: 'test-bottle' },
        { id: 'Injeção', icon: 'injection-syringe' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cardImg}>
                <Text style={[styles.inputLabel, { textAlign: 'center' }]}>Foto do medicamento</Text>
                <Pressable onPress={handleChooseImage} style={styles.cardAdcImg}>
                    <Image
                        source={
                            imageUri
                                ? { uri: imageUri }
                                : { uri: 'https://icon-library.com/images/pill-icon-png/pill-icon-png-0.jpg' }
                        }
                        style={styles.previewImage}
                    />
                </Pressable>
            </View>

            <View style={{ width: '100%' }}>
                <Text style={styles.inputLabel}>Nome do medicamento</Text>
                <TextInput style={styles.input} value={nomeMedicamento} onChangeText={setNomeMedicamento} />
            </View>

            <View style={{ width: '100%' }}>
                <Text style={styles.inputLabel}>Quantidade do medicamento</Text>
                <View style={[styles.rowInputs, { alignItems: 'center' }]}>
                    <Pressable onPress={decrementar} style={styles.btnQtd}>
                        <Text style={styles.btnQtdText}>-</Text>
                    </Pressable>

                    <TextInput
                        style={[styles.input, styles.inputQtd]}
                        value={quantidade}
                        onChangeText={(text) => {
                            const cleaned = text.replace(/[^0-9]/g, '');
                            setQuantidade(cleaned === '' ? '0' : cleaned);
                        }}
                        keyboardType="numeric"
                    />

                    <Pressable onPress={incrementar} style={styles.btnQtd}>
                        <Text style={styles.btnQtdText}>+</Text>
                    </Pressable>

                    <DropdownComponent />
                </View>
            </View>

            <View style={{ width: '100%' }}>
                <Text style={styles.inputLabel}>Tipo de medicação</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
                    {tiposMedicacao.map((item) => (
                        <Pressable
                            key={item.id}
                            style={[styles.iconBox, tipoSelecionado === item.id && styles.iconBoxSelecionado]}
                            onPress={() => setTipoSelecionado(item.id)}
                        >
                            <Fontisto name={item.icon} size={30} color={'green'} />
                        </Pressable>
                    ))}
                </ScrollView>
            </View>

            <View style={{ width: '100%' }}>
                <MultiSelect style={styles.input} />
            </View>

            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                <View style={[styles.rowInputs, { width: '100%' }]}>
                    <View style={{ width: '49%' }}>
                        <Text style={styles.inputLabel}>Duração</Text>
                        <View style={[styles.rowInputs, { alignItems: 'center' }, styles.input]}>
                            <MaterialCommunityIcons style={{ width: '25%' }} name='chart-line-variant' size={30} color={'green'} />
                            <TextInput
                                style={{ width: '75%', outlineStyle: 'none' }}
                                placeholder="Ex: 7 dias"
                                value={duracaoRaw}
                                onChangeText={(text) => {
                                    const cleaned = text.replace(/[^0-9]/g, '');
                                    setDuracaoRaw(cleaned.slice(0, 4));
                                }}
                                keyboardType="numeric"
                            />
                        </View>
                        {duracaoRaw ? (
                            <Text style={{ fontSize: 10, marginTop: 4, textAlign: 'center' }}>{formatarDuracao(duracaoRaw)}</Text>
                        ) : null}
                    </View>

                    <View style={{ width: '49%' }}>
                        <Text style={styles.inputLabel}>Frequência</Text>
                        <View style={[styles.rowInputs, { alignItems: 'center' }, styles.input]}>
                            <MaterialCommunityIcons style={{ width: '25%' }} name='clock-alert-outline' color={'green'} size={30} />
                            <TextInput
                                style={{ width: '75%', outlineStyle: 'none' }}
                                placeholder="Ex: 1x por hora"
                                value={frequenciaRaw}
                                onChangeText={(text) => {
                                    const cleaned = text.replace(/[^0-9]/g, '');
                                    setFrequenciaRaw(cleaned.slice(0, 2));
                                }}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.btnEnviar} onPress={enviarParaAPI}>
                <Text style={styles.textoBtn}>Enviar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 8,
        margin: 10,
        backgroundColor: '#F5F5F5',
    },
    cardAdcImg: {
        width: 170,
        height: 170,
        marginBottom: 20,
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    previewImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    input: {
        outlineStyle: 'none', padding: 5,
        paddingVertical: 12,
        borderRadius: 5,
        backgroundColor: '#fff',
        width: '100%',
    },
    rowInputs: {
        outlineStyle: 'none', flexDirection: 'row',
        gap: 5,
        marginTop: 8,
    },
    btnQtd: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    btnQtdText: {
        fontSize: 20,
    },
    inputQtd: {
        outlineStyle: 'none', textAlign: 'center',
        width: '100%',
        marginHorizontal: 10,
    },
    btnEnviar: {
        backgroundColor: 'green',
        padding: 10,
        width: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoBtn: {
        fontSize: 20,
        color: 'white',
        fontWeight: '800',
    },
    inputLabel: {
        outlineStyle: 'none',
        textAlign: 'left',
        width: '100%',
        justifyContent: 'flex-end',
        marginBottom: 5,
    },
    cardImg: {
        width: '100%',
        height: 200,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    scrollContainer: {
        marginTop: 10,
        marginBottom: 20,
    },
    iconBox: {
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    iconBoxSelecionado: {
        borderWidth: 1,
        borderColor: 'green',
    },
});