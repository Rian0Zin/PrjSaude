import React, { useState } from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Remedio({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [remedios, setRemedios] = useState([
        {
            id: '1',
            nome: 'Paracetamol',
            dose: '500mg',
            imagem: 'https://th.bing.com/th/id/OIP.JVwLCv_7lnaWflea6l7VbgAAAA?w=200&h=200&c=10&o=6&pid=genserp&rm=2',
            horarios: ['Após almoço', 'Após jantar'],
            duracao: '7 dias',
            frequencia: '1x por hora'
        },
        {
            id: '2',
            nome: 'Ronaldo',
            dose: '500mg',
            imagem: 'https://th.bing.com/th/id/OIP.JVwLCv_7lnaWflea6l7VbgAAAA?w=200&h=200&c=10&o=6&pid=genserp&rm=2',
            horarios: ['Após almoço', 'Após jantar'],
            duracao: '7 dias',
            frequencia: '1x por hora'
        },
        {
            id: '3',
            nome: 'chibatozil',
            dose: '500mg',
            imagem: 'https://th.bing.com/th/id/OIP.JVwLCv_7lnaWflea6l7VbgAAAA?w=200&h=200&c=10&o=6&pid=genserp&rm=2',
            horarios: ['Após almoço', 'Após jantar'],
            duracao: '7 dias',
            frequencia: '1x por hora'
        },
        {
            id: '6',
            nome: 'Paracetamol',
            dose: '500mg',
            imagem: 'https://th.bing.com/th/id/OIP.JVwLCv_7lnaWflea6l7VbgAAAA?w=200&h=200&c=10&o=6&pid=genserp&rm=2',
            horarios: ['Após almoço', 'Após jantar'],
            duracao: '7 dias',
            frequencia: '1x por hora'
        },
        {
            id: '4',
            nome: 'Paracetamol',
            dose: '500mg',
            imagem: 'https://th.bing.com/th/id/OIP.JVwLCv_7lnaWflea6l7VbgAAAA?w=200&h=200&c=10&o=6&pid=genserp&rm=2',
            horarios: ['Após almoço', 'Após jantar'],
            duracao: '7 dias',
            frequencia: '1x por hora'
        },
        {
            id: '5',
            nome: 'Paracetamol',
            dose: '500mg',
            imagem: 'https://th.bing.com/th/id/OIP.JVwLCv_7lnaWflea6l7VbgAAAA?w=200&h=200&c=10&o=6&pid=genserp&rm=2',
            horarios: ['Após almoço', 'Após jantar'],
            duracao: '7 dias',
            frequencia: '1x por hora'
        },
    ]);

    const [remedioSelecionado, setRemedioSelecionado] = useState(null);

    const HandleEditar = () => {
        setModalVisible(false);
        Alert.alert("Editar", `Editar: ${remedioSelecionado?.nome}`);
    };

    const handleExcluir = () => {
        setModalVisible(false);
        setRemedios(remedios.filter(r => r.id !== remedioSelecionado?.id));
        Alert.alert("Excluído", `Remédio "${remedioSelecionado?.nome}" excluído.`);
    };

    const abrirMenu = (remedio) => {
        setRemedioSelecionado(remedio);
        setModalVisible(true);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <TouchableOpacity style={styles.botaoMenu} onPress={() => abrirMenu(item)}>
                <MaterialCommunityIcons name="dots-horizontal" size={24} color="#333" />
            </TouchableOpacity>

            <View style={styles.imagemCard}>
                <Image style={styles.image} source={{ uri: item.imagem }} />
            </View>

            <View style={styles.textoCard}>
                <View style={styles.linhaInfo}>
                    <Text style={styles.nomeRemedio} numberOfLines={1}>{item.nome}</Text>
                    <Text style={styles.textoDose}>{item.dose}</Text>
                </View>

                <View style={styles.horariosContainer}>
                    {item.horarios.length > 0 ? (
                        <Text style={styles.textoPredefinido}>
                            {item.horarios.join(' | ')}
                        </Text>
                    ) : (
                        <Text style={[styles.textoPredefinido, { fontStyle: 'italic', color: '#aaa' }]}>
                            Sem horários definidos
                        </Text>
                    )}
                </View>

                <View style={styles.iconePillsWrapper}>
                    <Fontisto name="pills" size={15} style={styles.iconePills} />
                </View>

                <View style={styles.duracaoContainer}>
                    <MaterialCommunityIcons name="timelapse" size={20} color={'green'} />
                    <Text style={styles.textoDuracao}>Duração: {item.duracao}</Text>
                </View>
                <View style={styles.duracaoContainer}>
                    <MaterialCommunityIcons name="timelapse" size={20} color={'green'} />
                    <Text style={styles.textoDuracao}>Frequência: {item.frequencia}</Text>
                </View>
            </View>
        </View>
    );

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

            <View style={styles.medicamentosContainer}>
                <FlatList
                    data={remedios}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={HandleEditar} style={styles.modalOption}>
                            <Text style={styles.modalText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleExcluir} style={styles.modalOption}>
                            <Text style={styles.modalText}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    medicamentosContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        width: 350,
        shadowColor: 'grey',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        marginBottom: 20,
        position: 'relative',
    },
    imagemCard: {
        width: '40%',
        height: 120,
        borderRadius: 10,
        overflow: 'hidden',
        marginRight: 10,
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
    linhaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 5,
    },
    nomeRemedio: {
        fontSize: 16,
        flex: 1,
    },
    textoDose: {
        fontSize: 14,
        color: '#666',
    },
    horariosContainer: {
        marginBottom: 5,
        flexWrap: 'wrap',
    },
    textoPredefinido: {
        fontSize: 14,
        color: '#333',
        marginHorizontal: 2,
    },
    iconePillsWrapper: {
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    iconePills: {
        backgroundColor: '#ddd',
        borderRadius: 5,
        padding: 5,
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
    botaoMenu: {
        position: 'absolute',
        top: 50,
        right: 130,
        zIndex: 1,
        padding: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: 200,
        alignItems: 'center',
    },
    modalOption: {
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        color: '#333',
    },
});
