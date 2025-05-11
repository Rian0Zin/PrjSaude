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
import React, { useState,useEffect } from 'react';
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

export default function DigitarDadosRemedio({ route, navigation }) {

    const { remedioParaEditar } = route.params || {};

    // Resetar completamente os estados quando o parâmetro remedioParaEditar muda
    const [imageUri, setImageUri] = useState(null);
    const [quantidadeRemedio, setQuantidadeRemedio] = useState('1');
    const [tipoRemedio, setTipoRemedio] = useState(null);
    const [duracaoRemedio, setDuracaoRemedio] = useState('');
    const [frequenciaRemedio, setFrequenciaRemedio] = useState('');
    const [nomeRemedio, setNomeRemedio] = useState('');
    const [uniMedidaRemedio, setUniMedidaRemedio] = useState(null);
    const [selectedTimes, setSelectedTimes] = useState([]);

    const handleSelectTime = (time) => {
        const timeValue = typeof time === 'object' ? time.value : time;
        setSelectedTimes(prev => {
            const exists = prev.some(item => item.value === timeValue);
            if (exists) {
                return prev.filter(item => item.value !== timeValue);
            } else {
                return [...prev, { value: timeValue.toString(), label: `Horário ${timeValue}` }];
            }
        });
    };


    // Efeito para carregar dados apenas quando for edição
    useEffect(() => {
    if (remedioParaEditar) {
        setImageUri(remedioParaEditar.fotoRemedio 
            ? `http://127.0.0.1:8081/img/fotoRemedio/${remedioParaEditar.fotoRemedio}` 
            : null);
        setQuantidadeRemedio(remedioParaEditar.qntRemedio?.toString() || '1');
        setTipoRemedio(remedioParaEditar.tipoRemedio || null);
        setDuracaoRemedio(remedioParaEditar.duracaoRemedio?.toString() || '');
        setFrequenciaRemedio(remedioParaEditar.frequenciaRemedio?.toString() || '');
        setNomeRemedio(remedioParaEditar.nomeRemedio || '');
        setUniMedidaRemedio(remedioParaEditar.uniMedidaRemedio || null);
        
        // SOLUÇÃO DEFINITIVA PARA OS HORÁRIOS
        try {
            const horarios = Array.isArray(remedioParaEditar.horarioPredefinidoRemedio)
                ? remedioParaEditar.horarioPredefinidoRemedio
                : [];
            
            // Converta para o formato que o MultiSelect espera
            setSelectedTimes(horarios.map(num => ({
                value: num.toString(), // Garante que é string
                label: `Horário ${num}` // Ou o formato que seu componente usa
            })));
            
            console.log('Horários formatados para MultiSelect:', horarios);
        } catch (error) {
            console.error('Erro ao formatar horários:', error);
            setSelectedTimes([]);
        }
    }else {
        // Reset para novo remédio
        setImageUri(null);
        setQuantidadeRemedio('1');
        setTipoRemedio(null);
        setDuracaoRemedio('');
        setFrequenciaRemedio('');
        setNomeRemedio('');
        setUniMedidaRemedio(null);
        setSelectedTimes([]);
    }

    navigation.setOptions({
        title: remedioParaEditar ? 'Editar Remédio' : 'Adicionar Remédio'
    });
}, [route.params?.remedioParaEditar]);
useEffect(() => {
    console.log('Horários carregados:', selectedTimes);
}, [selectedTimes]);

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
        const numDias = parseInt(dias) || 0;

        if (numDias === 0) return '0 dias';
        if (numDias < 30) return `${numDias} dia${numDias > 1 ? 's' : ''}`;

        const meses = Math.floor(numDias / 30);
        const diasRestantes = numDias % 30;

        if (meses < 12) {
            return `${meses} mês${meses > 1 ? 'es' : ''}` +
                (diasRestantes > 0 ? ` e ${diasRestantes} dia${diasRestantes > 1 ? 's' : ''}` : '');
        }

        const anos = Math.floor(meses / 12);
        const mesesRestantes = meses % 12;

        return `${anos} ano${anos > 1 ? 's' : ''}` +
            (mesesRestantes > 0 ? ` e ${mesesRestantes} mês${mesesRestantes > 1 ? 'es' : ''}` : '');
    };

    // Função para formatar frequência (horas para dias)
    const formatarFrequencia = (horas) => {
        const numHoras = parseInt(horas) || 0;

        if (numHoras === 0) return '0 horas';
        if (numHoras < 24) return `${numHoras} hora${numHoras > 1 ? 's' : ''}`;

        const dias = Math.floor(numHoras / 24);
        const horasRestantes = numHoras % 24;

        return `${dias} dia${dias > 1 ? 's' : ''}` +
            (horasRestantes > 0 ? ` e ${horasRestantes} hora${horasRestantes > 1 ? 's' : ''}` : '');
    };

     const enviarParaAPI = async () => {
    if (!nomeRemedio.trim()) {
        Alert.alert('Erro', 'Preencha o nome do medicamento.');
        return;
    }

    const remedio = new FormData();

    // 1. Campos básicos
    remedio.append('nomeRemedio', nomeRemedio);
    remedio.append('qntRemedio', quantidadeRemedio);
    remedio.append('tipoRemedio', tipoRemedio || '');
    remedio.append('uniMedidaRemedio', uniMedidaRemedio || '');
    remedio.append('duracaoRemedio', duracaoRemedio);
    remedio.append('frequenciaRemedio', frequenciaRemedio);

    // Comente ou remova todo o bloco de tratamento de imagem:
    // if (imageUri && !imageUri.includes('http://127.0.0.1:8081')) {
    //     try {
    //         // ... código de processamento de imagem ...
    //     } catch (error) {
    //         console.error('Erro ao processar imagem:', error);
    //         Alert.alert('Erro', 'Não foi possível carregar a imagem');
    //         return;
    //     }
    // } else if (remedioParaEditar?.fotoRemedio) {
    //     remedio.append('fotoRemedio', remedioParaEditar.fotoRemedio);
    // }
    

    // 3. Horários predefinidos - Correção definitiva
    try {
        const horariosArray = selectedTimes.map(item => parseInt(item.value));
        // Then append as JSON string
        remedio.append('horarioPredefinidoRemedio', JSON.stringify(horariosArray));
    } catch (error) {
        console.error('Erro ao formatar horários:', error);
        Alert.alert('Erro', 'Formato de horários inválido');
        return;
    }


    // DEBUG: Verifique todo o FormData antes de enviar
    console.log('Dados completos a serem enviados:');
    for (let [key, value] of remedio.entries()) {
        console.log(key, value);
    }

    try {
        const config = { 
            headers: { 
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            } 
        };

        const url = remedioParaEditar?.idRemedio 
            ? `/remedio/${remedioParaEditar.idRemedio}`
            : '/remedio';
            
        const response = await api.post(url, remedio, config);
        
        Alert.alert('Sucesso', remedioParaEditar 
            ? 'Medicamento atualizado com sucesso!'
            : 'Medicamento cadastrado com sucesso!');
            
        navigation.navigate('Lembretes de remedio');
    } catch (error) {
        console.error('Erro completo:', error);
        console.error('Resposta do erro:', error.response?.data);
        
        let errorMessage = 'Falha ao enviar os dados.';
        if (error.response?.data?.erro) {
            errorMessage = error.response.data.erro;
        } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }
        
        Alert.alert('Erro', errorMessage);
    }
};

    const tiposMedicacao = [
        { id: 'Pilula', icon: 'pills' },
        { id: 'Comprimido', icon: 'drug-pack' },
        { id: 'Xarope', icon: 'test-bottle' },
        { id: 'Injeção', icon: 'injection-syringe' },
    ];

    console.log('SelectedTimes:', selectedTimes);

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

                    <DropdownComponent 
                        onSelect={(value) => setUniMedidaRemedio(value)}
                        selectedValue={uniMedidaRemedio}  // Passe o valor atual para o dropdown
                    />
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
                <MultiSelect style={styles.input} selectedItems={selectedTimes} setSelectedItems={setSelectedTimes} />
            </View>

            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                <View style={[styles.rowInputs, { width: '100%' }]}>
                    <View style={{ width: '49%' }}>
                        <Text style={styles.inputLabel}>Duração (em dias)</Text>
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
                            <Text style={{ fontSize: 10, marginTop: 4, textAlign: 'center' }}>
                                {formatarDuracao(duracaoRemedio)}
                            </Text>
                        ) : null}
                    </View>

                    <View style={{ width: '49%' }}>
                        <Text style={styles.inputLabel}>Frequência (em horas)</Text>
                        <View style={[styles.rowInputs, { alignItems: 'center' }, styles.input]}>
                            <MaterialCommunityIcons style={{ width: '25%' }} name='clock-alert-outline' color={'green'} size={30} />
                            <TextInput
                                style={{ width: '75%', outlineStyle: 'none' }}
                                placeholder="Ex: 8 horas"
                                value={frequenciaRemedio}
                                onChangeText={(text) => {
                                    const cleaned = text.replace(/[^0-9]/g, '');
                                    setFrequenciaRemedio(cleaned.slice(0, 3));
                                }}
                                keyboardType="numeric"
                            />
                        </View>
                        {frequenciaRemedio ? (
                            <Text style={{ fontSize: 10, marginTop: 4, textAlign: 'center' }}>
                                {formatarFrequencia(frequenciaRemedio)}
                            </Text>
                        ) : null}
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.btnEnviar} onPress={enviarParaAPI}>
                <Text style={styles.textoBtn}>
                    {remedioParaEditar ? 'Atualizar' : 'Enviar'}
                </Text>
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