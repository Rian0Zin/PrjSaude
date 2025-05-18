import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, ActivityIndicator, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

export default function Header({ title }) {
    const navigation = useNavigation();
    const [foto, setFoto] = useState(null);
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [loading, setLoading] = useState(true);
    const [logoutLoading, setLogoutLoading] = useState(false);

    const carregarUsuario = async () => {
        try {
            const dadosUsuario = await AsyncStorage.getItem('usuario');
            
            if (dadosUsuario) {
                const usuario = JSON.parse(dadosUsuario);
                setUsuarioLogado(usuario);
                usuario.fotoUsuario && setFoto(`http://127.0.0.1:8081/img/fotoUsuario/${usuario.fotoUsuario}`);
            } else {
                setUsuarioLogado(null);
                setFoto(null);
            }
        } catch (error) {
            console.error('Erro ao carregar usuário:', error);
            await AsyncStorage.removeItem('usuario');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarUsuario();
        const unsubscribe = navigation.addListener('focus', carregarUsuario);
        return unsubscribe;
    }, [navigation]);

    const handleLogout = async () => {
        try {
            setLogoutLoading(true);
            
            await AsyncStorage.clear();
            
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            );
            
        } catch (error) {
            console.error('Erro no logout:', error);
        } finally {
            setLogoutLoading(false);
        }
    };

    const handlePerfilPress = () => {
        navigation.navigate(usuarioLogado ? 'Registro' : 'Login', {
            usuarioParaEditar: usuarioLogado,
            onGoBack: carregarUsuario
        });
    };

    if (loading) {
        return (
            <View style={[styles.header, styles.loadingContainer]}>
                <ActivityIndicator size="small" color="#4CAF50" />
            </View>
        );
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <FontAwesome6 name="bars" size={24} color="#4CAF50" />
            </TouchableOpacity>

            <Text style={styles.title}>{title}</Text>

            <View style={styles.rightContainer}>
                {usuarioLogado && (
                    <TouchableOpacity 
                        onPress={handleLogout}
                        style={styles.logoutButton}
                        disabled={logoutLoading}
                    >
                        {logoutLoading ? (
                            <ActivityIndicator size="small" color="#4CAF50" />
                        ) : (
                            <FontAwesome6 name="door-open" size={24} color="#4CAF50" />
                        )}
                    </TouchableOpacity>
                )}
                
                <TouchableOpacity onPress={handlePerfilPress}>
                    {foto ? (
                        <Image
                            source={{ uri: foto }}
                            style={styles.profileImage}
                            onError={() => setFoto(null)}
                        />
                    ) : (
                        <AntDesign
                            name="user"
                            size={24}
                            color="#4CAF50"
                            style={styles.profilePlaceholder}
                        />
                    )}
                </TouchableOpacity>
            </View>
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
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
        elevation: 2,
    },
    loadingContainer: {
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 10,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    logoutButton: {
        padding: 6,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#4CAF50',
    },
    profilePlaceholder: {
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        padding: 8,
        borderWidth: 1,
        borderColor: '#4CAF50',
    },
});