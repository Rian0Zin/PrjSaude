import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const etapas = [
    {
        titulo: "Respiração 4-7-8",
        descricao: "Inspire por 4 segundos, segure por 7, e expire lentamente por 8 segundos. Repita 3 vezes para desacelerar o corpo.",
    },
    {
        titulo: "Desconecte-se",
        descricao: "Evite telas e notificações agora. Seu cérebro precisa de silêncio para começar a desligar.",
    },
    {
        titulo: "Som Calmante",
        descricao: "Toque um som de chuva ou ondas do mar. Feche os olhos e deixe o som guiar sua respiração.",
    },
    {
        titulo: "Frase da Noite",
        descricao: "“Está tudo bem em pausar. O descanso também é um ato de autocuidado.”",
    }
];

export default function DicasDormir({ navigation }) {
    const [etapa, setEtapa] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const sound = useRef(null);

    const proximaEtapa = () => {
        if (etapa < etapas.length - 1) {
            setEtapa(etapa + 1);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            // Ao entrar na tela
            tocarSom();
            setEtapa(0);
            return () => {
                // Ao sair da tela
                if (sound.current) {
                    sound.current.stopAsync();
                    sound.current.unloadAsync();
                    sound.current = null;
                }
            };
        }, [])
    );

    const tocarSom = async () => {
        try {
            if (sound.current) {
                await sound.current.unloadAsync();
            }

            const { sound: novoSom } = await Audio.Sound.createAsync(
                require('../../../assets/chuva-1-119168.mp3'),
                { shouldPlay: true }
            );
            sound.current = novoSom;
            setIsPlaying(true);
            
            // Configurar listener para quando o som terminar naturalmente
        
        } catch (error) {
            console.error('Erro ao carregar o som:', error);
        }
    };

    const toggleSom = async () => {
        if (!sound.current) return;
        
        try {
            const status = await sound.current.getStatusAsync();
            
            if (status.isPlaying) {
                await sound.current.pauseAsync();
                setIsPlaying(false);
            } else {
                await sound.current.playAsync();
                setIsPlaying(true);
            }
        } catch (error) {
            console.error('Erro ao alternar o som:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.tituloContainer}>
                    <Text style={styles.titulo}>{etapas[etapa].titulo}</Text>
                    <TouchableOpacity
                        style={styles.iconeSom}
                        onPress={toggleSom}
                    >
                        <Ionicons
                            name={isPlaying ? "volume-high" : "volume-mute"}
                            size={24}
                            color="#2e7d32"
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.descricao}>{etapas[etapa].descricao}</Text>
            </View>

            {etapa < etapas.length - 1 ? (
                <TouchableOpacity style={styles.botao} onPress={proximaEtapa}>
                    <Text style={styles.botaoTexto}>Próximo</Text>
                </TouchableOpacity>
            ) : (
                <Text style={styles.fim}>Boa noite ✨</Text>
            )}
        </SafeAreaView>
    );
}

// ... (mantenha os estilos como estão)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6f4ea',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    tituloContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
    },
    iconeSom: {
        position: 'absolute',
        right: 0,
        marginBottom: 13,
    },

    card: {
        backgroundColor: '#ffffff',
        padding: 30,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        width: '100%',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2e7d32',
        marginBottom: 15,
        textAlign: 'center',
    },
    descricao: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
    },
    botao: {
        marginTop: 30,
        backgroundColor: '#4caf50',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 30,
    },
    botaoTexto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    fim: {
        marginTop: 30,
        fontSize: 18,
        color: '#2e7d32',
        fontStyle: 'italic',
    }
});