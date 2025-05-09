import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    TextInput,
    Pressable,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import DropdownComponent from '../../Components/Dropdown';
import MultiSelect from '../../Components/MultiSelect';
import { launchImageLibrary } from 'react-native-image-picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DigitarDadosRemedio({ navigation }) {
    const [imageUri, setImageUri] = useState(null);
    const [quantidade, setQuantidade] = useState('1');
    const [tipoSelecionado, setTipoSelecionado] = useState(null);

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

    const tiposMedicacao = [
        { id: 'Pilula', icon: 'pills' },
        { id: 'Comprimido', icon: 'drug-pack' },
        { id: 'Xarope', icon: 'test-bottle' },
        { id: 'Injeção', icon: 'injection-syringe' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cardImg}>
                <Text style={[styles.inputLabel, { textAlign: 'center' }]}>
                    Foto do medicamento
                </Text>
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
                <TextInput style={styles.input} />
            </View>

            <View style={{ width: '100%'}}>
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
                            setQuantidade(cleaned === '' ? '1' : cleaned);
                        }}
                        keyboardType="numeric"
                    />

                    <Pressable onPress={incrementar} style={styles.btnQtd}>
                        <Text style={styles.btnQtdText}>+</Text>
                    </Pressable>

                    <DropdownComponent/>
                </View>
            </View>

            <View style={{ width: '100%' }}>
                <Text style={styles.inputLabel}>Tipo de medicação</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
                    {tiposMedicacao.map((item) => (
                        <Pressable
                            key={item.id}
                            style={[
                                styles.iconBox,
                                tipoSelecionado === item.id && styles.iconBoxSelecionado,
                            ]}
                            onPress={() => setTipoSelecionado(item.id)}
                        >
                            <Fontisto name={item.icon} size={30}/>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>

            <View style={{ width: '100%' }}>
                <MultiSelect style={styles.input} />
            </View>

            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom:5}}>
                <View style={[styles.rowInputs, { width: '100%' }]}>
                    <View style={{ width: '49%' }}>
                        <Text style={styles.inputLabel}>Duração</Text>
                        <View style={[styles.rowInputs, { alignItems: 'center' }, styles.input]}>
                            <MaterialCommunityIcons style={{width:'25%'}} name='timelapse' size={30} color={'green'}/>
                            <TextInput style={{width:'75%', outlineStyle: 'none',}} placeholder="Ex: 7 dias" />
                        </View>
                    </View>
                    <View style={{ width: '49%' }}>
                        <Text style={styles.inputLabel}>Frequência</Text>
                        <View style={[styles.rowInputs, { alignItems: 'center' }, styles.input]}>
                            <MaterialCommunityIcons style={{width:'25%'}} name='timer-settings-outline' size={30} color={'green'}/>
                            <TextInput style={{width:'75%', outlineStyle: 'none',}} placeholder="Ex: 3x ao dia" />
                        </View>
                        
                    </View>
                </View>
            </View>

            <Pressable style={styles.btnEnviar}>
                <Text style={styles.textoBtn}>Enviar</Text>
            </Pressable>
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
    },
    cardAdcImg: {
        width: 170,
        height: 170,
        marginBottom: 20,
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#ddd',
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
        backgroundColor: '#ddd',
        width: '100%',
    },
    rowInputs: {
        flexDirection: 'row',
        gap: 5,
        marginTop: 8,
    },
    btnQtd: {
        backgroundColor: '#ddd',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    btnQtdText: {
        outlineStyle: 'none',
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
        fontweight: '800',
    },
    inputLabel: {
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
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    iconBoxSelecionado: {
        borderWidth:1,
        borderColor:'green',
    },
});
