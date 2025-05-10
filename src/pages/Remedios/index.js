import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Modal,
    Pressable,
    Alert,
    FlatList
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default function Remedio({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [remedios, setRemedios] = useState([]);
    const [remedioSelecionado, setRemedioSelecionado] = useState(null);

    const parseHorarios = (horarios) => {
        if (Array.isArray(horarios)) return horarios;
        if (typeof horarios === 'string') {
            try {
                const parsed = JSON.parse(horarios);
                return Array.isArray(parsed) ? parsed : [];
            } catch {
                return [];
            }
        }
        return [];
    };

    const fetchRemedios = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8081/api/remedio');

            if (response.status === 200) {
                const remediosFormatados = response.data.map(remedio => ({
                    ...remedio,
                    horarioPredefinidoRemedio: parseHorarios(remedio.horarioPredefinidoRemedio)
                }));
                setRemedios(remediosFormatados);
            } else {
                console.error('Erro na API:', response.status, response.statusText);
                Alert.alert('Erro', 'Não foi possível carregar os remédios');
            }
        } catch (error) {
            console.error('Erro ao buscar os remédios:', error);
            Alert.alert('Erro', 'Falha na conexão com o servidor');
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchRemedios();

            return () => {
                console.log('Saindo da tela de Remédios');
            };
        }, [])
    );

    const tipoRemedioIcones = {
        'Pilula': 'pills',
        'Comprimido': 'drug-pack',
        'Xarope': 'test-bottle',
        'Injeção': 'injection-syringe',
        'default': 'pills'
    };

    const horariosMapeados = {
        1: {
            texto: 'Após almoço',
            icone: 'weather-sunny'
        },
        2: {
            texto: 'Após jantar',
            icone: 'weather-night'
        }
    };

    const handleEditar = () => {
    if (!remedioSelecionado) return;
    setModalVisible(false);
    navigation.navigate('Remedio', { 
        remedioParaEditar: remedioSelecionado 
    });
};

    const handleExcluir = async () => {
    console.log('Remédio selecionado:', remedioSelecionado); // Debug
    if (!remedioSelecionado?.idRemedio) {
        Alert.alert("Erro", "Selecione um remédio válido.");
        return;
    }

    try {
        console.log("Enviando requisição DELETE para:", `http://127.0.0.1:8081/api/remedio/${remedioSelecionado.idRemedio}`);
        await axios.delete(`http://127.0.0.1:8081/api/remedio/${remedioSelecionado.idRemedio}`);
        
        const novosRemedios = remedios.filter(r => r.idRemedio !== remedioSelecionado.idRemedio);
        setRemedios(novosRemedios);
        Alert.alert("Sucesso", `Remédio "${remedioSelecionado.nomeRemedio}" excluído.`);
    } catch (error) {
        console.error("Erro detalhado:", error.response?.data || error.message);
        Alert.alert("Erro", error.response?.data?.mensagem || "Falha ao excluir.");
    } finally {
        setModalVisible(false);
    }
};


    const abrirMenu = (remedio) => {
        console.log('Remédio selecionado:', remedio); // Debug
        setRemedioSelecionado(remedio);
        setModalVisible(true);
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


    const renderItem = ({ item }) => {
        const horarios = Array.isArray(item.horarioPredefinidoRemedio) ?
            item.horarioPredefinidoRemedio :
            [];

        return (
            <View style={styles.card}>
                <View style={styles.imagemCard}>
                    <Image
                        style={styles.image}
                        source={
                            item.fotoRemedio
                                ? { uri: `http://127.0.0.1:8081/img/fotoRemedio/${item.fotoRemedio}` }
                                : { uri: 'https://icon-library.com/images/pill-icon-png/pill-icon-png-0.jpg' }
                        }
                    />
                </View>

                <View style={styles.textoCard}>
                    <View style={styles.linhaInfo}>
                        <Text style={styles.nomeRemedio} numberOfLines={1}>{item.nomeRemedio}</Text>
                        <Text style={styles.textoDose}>{item.qntRemedio}{item.uniMedidaRemedio}</Text>
                    </View>
                    <View style={styles.topRow}>
                        <TouchableOpacity onPress={() => abrirMenu(item)} style={styles.menuButton}>
                            <MaterialCommunityIcons name="dots-horizontal" size={20} color="green" />
                        </TouchableOpacity>
                        <Fontisto
                            name={tipoRemedioIcones[item.tipoRemedio] || tipoRemedioIcones.default}
                            size={15}
                            style={styles.iconePills}
                            color={'white'}
                        />
                    </View>

                    <View style={styles.horariosWrapper}>
                        {horarios.length > 0 ? (
                            horarios.map((codigo, index) => {
                                const codigoNum = Number(codigo);
                                const horario = horariosMapeados[codigoNum];

                                return horario ? (
                                    <View key={`horario-${index}`} style={styles.horarioItem}>
                                        <MaterialCommunityIcons
                                            name={horario.icone}
                                            size={16}
                                            color="green"
                                            style={{ marginRight: 4 }}
                                        />
                                        <Text style={styles.textoPredefinido}>
                                            {horario.texto}
                                        </Text>
                                    </View>
                                ) : null;
                            })
                        ) : (
                            <Text style={[styles.textoPredefinido, { fontStyle: 'italic', color: '#aaa' }]}>
                                Sem horários definidos
                            </Text>
                        )}
                    </View>

                    <View style={styles.duracaoContainer}>
                        <MaterialCommunityIcons name="chart-line-variant" size={20} color={'green'} />
                        <Text style={styles.textoDuracao}>
                            Duração: {formatarDuracao(item.duracaoRemedio)}
                        </Text>
                    </View>
                    <View style={styles.duracaoContainer}>
                        <MaterialCommunityIcons name="clock-alert-outline" size={20} color={'green'} />
                        <Text style={styles.textoDuracao}>
                            Frequência: {formatarFrequencia(item.frequenciaRemedio)}
                        </Text>
                    </View>


                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.blocoAdicionar}>
                <View style={styles.containerAdicionar}>
                    <View style={styles.textoAdicionar}>
                        <Text style={{ fontSize: 20 }}>Adicionar lembrete</Text>
                    </View>
                    <View style={styles.botaoAdicionarContainer}>
                        <TouchableOpacity style={styles.adicionar} onPress={() => navigation.navigate('Remedio')}>
                            <AntDesign name="plus" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <FlatList
                data={remedios}
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 100, alignItems: 'center' }}
                showsVerticalScrollIndicator={false}
            />

            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalView}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity onPress={handleEditar} style={styles.modalOption}>
                                <Text style={styles.modalText}>Editar</Text>
                            </TouchableOpacity>
                            <View style={styles.modalSeparator} />
                            <TouchableOpacity onPress={handleExcluir} style={styles.modalOption}>
                                <Text style={[styles.modalText, { color: 'red' }]}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#f7f7f7',
    },
    blocoAdicionar: {
        width: '95%',
        borderWidth: 2,
        borderColor: '#CEd4d3',
        borderRadius: 10,
        margin: 20,
        height: 100,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    containerAdicionar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoAdicionar: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoAdicionarContainer: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    adicionar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    card: {
        width: '100%',
        minWidth: 400,
        marginHorizontal: '20%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagemCard: {
        width: 150,
        height: 150,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 12
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    textoCard: {
        flex: 1,
        justifyContent: 'space-between',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuButton: {
        padding: 5,
    },
    iconePills: {
        backgroundColor: 'green',
        borderRadius: 5,
        padding: 5,
    },
    linhaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 5,
    },
    nomeRemedio: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },
    textoDose: {
        fontSize: 10,
        color: '#666',
        marginLeft: 10,
    },
    horariosWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: 5,
    },
    horarioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 4,
    },
    textoPredefinido: {
        fontSize: 14,
        color: '#333',
    },
    duracaoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    textoDuracao: {
        fontSize: 14,
        marginLeft: 5,
        color: '#333',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '100%',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 150,
        overflow: 'hidden',
    },
    modalOption: {
        paddingVertical: 15,
        alignItems: 'center',
    },
    modalSeparator: {
        height: 1,
        backgroundColor: '#f0f0f0',
        width: '100%',
    },
    modalText: {
        fontSize: 16,
        color: '#333',
    },
});