import React, { useEffect, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header({ title }) {
    const navigation = useNavigation();
    const [foto, setFoto] = useState(null);
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarUsuario() {
            try {
                setLoading(true);
                const dados = await AsyncStorage.getItem('usuario');
                
                // More robust check for undefined/null/empty
                if (dados && dados !== 'undefined' && dados !== 'null' && dados.trim() !== '') {
                    try {
                        const usuario = JSON.parse(dados);
                        
                        // Validate the user object structure
                        if (usuario && typeof usuario === 'object') {
                            console.log('Usuário logado:', usuario);
                            setUsuarioLogado(usuario);
                            
                            // Check if foto exists and is a string
                            if (usuario?.fotoUsuario) {
                                setFoto(`http://127.0.0.1:8081/img/fotoUsuario/${usuario.fotoUsuario}`);
                            }
                        }
                    } catch (parseError) {
                        console.error('Erro ao parsear usuário:', parseError);
                        await AsyncStorage.removeItem('usuario'); // Clean corrupted data
                    }
                }
            } catch (erro) {
                console.error('Erro ao carregar usuário:', erro);
            } finally {
                setLoading(false);
            }
        }

        carregarUsuario();

        // Listen for focus events to refresh user data
        const unsubscribe = navigation.addListener('focus', () => {
            carregarUsuario();
        });

        return unsubscribe;
    }, [navigation]);

    const handlePerfilPress = () => {
        if (usuarioLogado) {
            // Navega para a tela de edição passando o usuário como parâmetro
            navigation.navigate('Registro', { 
                usuarioParaEditar: usuarioLogado,
                // Adiciona um callback para atualizar a foto após edição
                onGoBack: () => carregarUsuario()
            });
        } else {
            // Navega para a tela de registro normal
            navigation.navigate('Registro');
        }
    };

    if (loading) {
        return (
            <View style={[styles.header, { justifyContent: 'center' }]}>
                <ActivityIndicator size="small" color="green" />
            </View>
        );
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <FontAwesome6 name="bars" size={30} color="green" />
            </TouchableOpacity>

            <Text style={styles.textoHeader}>{title}</Text>

            <TouchableOpacity onPress={handlePerfilPress}>
                {foto ? (
                    <Image
                        source={{ uri: foto }}
                        style={styles.fotoPerfil}
                        onError={(e) => {
                            console.log('Erro ao carregar imagem:', e.nativeEvent.error);
                            setFoto(null);
                        }}
                    />
                ) : (
                    <AntDesign
                        style={styles.placeholderIcon}
                        name="user"
                        size={35}
                        color="green"
                    />
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: 'white',
        borderBottomWidth: 2,
        borderColor: '#CEd4d3'
    },
    textoHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000',
        letterSpacing: 1
    },
    fotoPerfil: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'green'
    },
    placeholderIcon: {
        borderRadius: 50,
        borderColor: 'green',
        borderWidth: 2,
        padding: 2
    }
});