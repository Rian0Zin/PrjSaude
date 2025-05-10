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

// Configuração do axios no mesmo arquivo
const api = axios.create({
    baseURL: 'http://127.0.0.1:8081/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default function DigitarDadosRemedio({ navigation }) {
    const [imageUri, setImageUri] = useState(null);
    const [quantidadeRemedio, setQuantidadeRemedio] = useState('1');
    const [tipoRemedio, setTipoRemedio] = useState(null);
    const [duracaoRemedio, setDuracaoRemedio] = useState('');
    const [frequenciaRemedio, setFrequenciaRemedio] = useState('');
    const [nomeRemedio, setNomeRemedio] = useState('');
    const [uniMedidaRemedio, setUniMedidaRemedio] = useState(null);
    const [selectedTimes, setSelectedTimes] = useState([]);

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
        const valor = parseInt(quantidadeRemedio) || 0;
        setQuantidadeRemedio(String(valor + 1));
    };

    const decrementar = () => {
        const valor = parseInt(quantidadeRemedio) || 0;
        if (valor > 1) {
            setQuantidadeRemedio(String(valor - 1));
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
    if (!nomeRemedio.trim()) {
        Alert.alert('Erro', 'Preencha o nome do medicamento.');
        return;
    }

    if (!quantidadeRemedio || parseInt(quantidadeRemedio) <= 0) {
        Alert.alert('Erro', 'A quantidade deve ser maior que zero.');
        return;
    }

    if (!tipoRemedio) {
        Alert.alert('Erro', 'Selecione o tipo de medicação.');
        return;
    }

    if (!duracaoRemedio || parseInt(duracaoRemedio) <= 0) {
        Alert.alert('Erro', 'Informe a duração do tratamento.');
        return;
    }

    if (!frequenciaRemedio || parseInt(frequenciaRemedio) <= 0) {
        Alert.alert('Erro', 'Informe a frequência da medicação.');
        return;
    }

    const remedio = new FormData();

    // Lógica para imagem
    if (imageUri) {
    try {
        let file;
        if (imageUri.startsWith("data:image")) {
            // Se for uma imagem base64
            const response = await fetch(imageUri);
            const blob = await response.blob();
            const filename = `image_${Date.now()}.jpg`;
            file = new File([blob], filename, { type: blob.type });
            remedio.append("fotoRemedio", file);
        } else {
            // Se for uma imagem local (não Base64)
            const localUri = imageUri;
            const filename = localUri.split("/").pop(); // Extrair o nome do arquivo da URI
            const match = /\.(\w+)$/.exec(filename); // Extrair o tipo da imagem
            const type = match ? `image/${match[1]}` : "image/jpeg"; // Definir o tipo da imagem

            // Criar o objeto de arquivo com a URI local
            file = {
                uri: localUri,
                type: type,
                name: filename,
            };
            remedio.append("fotoRemedio", file);
        }
    } catch (error) {
        console.error('Erro ao processar a imagem:', error);
        Alert.alert('Erro', 'Falha ao processar a imagem.');
        return;
    }
}
    // Dados do medicamento
    remedio.append('nomeRemedio', nomeRemedio);
    remedio.append('qntRemedio', quantidadeRemedio);
    remedio.append('tipoRemedio', tipoRemedio);
    remedio.append('uniMedidaRemedio', uniMedidaRemedio);
    remedio.append('duracaoRemedio', duracaoRemedio);
    remedio.append('frequenciaRemedio', frequenciaRemedio);
    const selectedValues = selectedTimes.map(item => {
    const value = parseInt(item.value, 10);
        console.log(`Original: ${item.value}, Convertido: ${value}`);
        return value;
    });
    remedio.append('horarioPredefinidoRemedio', JSON.stringify(selectedValues));

    try {
        const response = await api.post('/remedio', remedio, {
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
                        source={imageUri ? { uri: imageUri } : { uri: 'https://icon-library.com/images/pill-icon-png/pill-icon-png-0.jpg' }}
                        style={styles.previewImage}
                    />
                </Pressable>
            </View>

            <View style={{ width: '100%' }}>
                <Text style={styles.inputLabel}>Nome do medicamento</Text>
                <TextInput style={styles.input} value={nomeRemedio} onChangeText={setNomeRemedio} />
            </View>

            <View style={{ width: '100%' }}>
                <Text style={styles.inputLabel}>Quantidade do medicamento</Text>
                <View style={[styles.rowInputs, { alignItems: 'center' }]}>
                    <Pressable onPress={decrementar} style={styles.btnQtd}>
                        <Text style={styles.btnQtdText}>-</Text>
                    </Pressable>

                    <TextInput
                        style={[styles.input, styles.inputQtd]}
                        value={quantidadeRemedio}
                        onChangeText={(text) => {
                            const cleaned = text.replace(/[^0-9]/g, '');
                            setQuantidadeRemedio(cleaned === '' ? '0' : cleaned);
                        }}
                        keyboardType="numeric"
                    />

                    <Pressable onPress={incrementar} style={styles.btnQtd}>
                        <Text style={styles.btnQtdText}>+</Text>
                    </Pressable>

                    <DropdownComponent onSelect={(value) => setUniMedidaRemedio(value)}/>
                </View>
            </View>

            <View style={{ width: '100%' }}>
                <Text style={styles.inputLabel}>Tipo de medicação</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
                    {tiposMedicacao.map((item) => (
                        <Pressable
                            key={item.id}
                            style={[styles.iconBox, tipoRemedio === item.id && styles.iconBoxSelecionado]}
                            onPress={() => setTipoRemedio(item.id)}
                        >
                            <Fontisto name={item.icon} size={30} color={'green'} />
                        </Pressable>
                    ))}
                </ScrollView>
            </View>

            <View style={{ width: '100%' }}>
                <MultiSelect style={styles.input} selectedItems={selectedTimes} setSelectedItems={setSelectedTimes}/>
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
                                value={duracaoRemedio}
                                onChangeText={(text) => {
                                    const cleaned = text.replace(/[^0-9]/g, '');
                                    setDuracaoRemedio(cleaned.slice(0, 4));
                                }}
                                keyboardType="numeric"
                            />
                        </View>
                        {duracaoRemedio ? (
                            <Text style={{ fontSize: 10, marginTop: 4, textAlign: 'center' }}>{formatarDuracao(duracaoRemedio)}</Text>
                        ) : null}
                    </View>

                    <View style={{ width: '49%' }}>
                        <Text style={styles.inputLabel}>Frequência</Text>
                        <View style={[styles.rowInputs, { alignItems: 'center' }, styles.input]}>
                            <MaterialCommunityIcons style={{ width: '25%' }} name='clock-alert-outline' color={'green'} size={30} />
                            <TextInput
                                style={{ width: '75%', outlineStyle: 'none' }}
                                placeholder="Ex: 1x por hora"
                                value={frequenciaRemedio}
                                onChangeText={(text) => {
                                    const cleaned = text.replace(/[^0-9]/g, '');
                                    setFrequenciaRemedio(cleaned.slice(0, 2));
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
        outlineStyle: 'none',
        padding: 5,
        paddingVertical: 12,
        borderRadius: 5,
        backgroundColor: '#fff',
        width: '100%',
    },
    rowInputs: {
        flexDirection: 'row',
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
        textAlign: 'center',
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
        textAlign: 'left',
        width: '100%',
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
