import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Audio } from 'expo-av';
import { Slider } from '@react-native-assets/slider';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const musicas = [
  {
    "id": 1,
    'audioFile': require('../../../assets/mantraCalmaria.mp3'),
    "img": "https://f4.bcbits.com/img/a1908449552_16.jpg",
    "nome": "Mantra da Calmaria",
    "frase": " Sonhos... Todo homem tem sonhos... Todo homem deseja perseguir seu sonho. Isso tortura ele, mas o sonho da sentido à vida dele. ",
    "autor":"Guts"
  },
  {
    "id": 2,
    'audioFile': require('../../../assets/unravel.mp3'), // Substitua pelo segundo arquivo
    "img": "https://i.scdn.co/image/ab67616d0000b2739505c1c6c045e222bda01ca0",
    "nome": "Mantra da Paz",
    "frase": " Não existe algo como o destino , é apenas uma combinação de circunstância com circunstância , e quem e que faz essas circunstâncias ? É você",
    "autor":"Rize"
  }
];

export default function Mantras({ navigation }) {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [musicaAtual, setMusicaAtual] = useState(0); // Índice da música atual
    const isSeeking = useRef(false);

    useEffect(() => {
        carregarAudio();
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [musicaAtual]); // Recarrega quando musicaAtual muda

    const carregarAudio = async () => {
        if (sound) {
            await sound.unloadAsync(); // Descarrega o áudio anterior
        }
        
        const { sound: novoSom } = await Audio.Sound.createAsync(
            musicas[musicaAtual].audioFile,
            { shouldPlay: false },
            onPlaybackStatusUpdate
        );
        setSound(novoSom);
    };

    const onPlaybackStatusUpdate = (status) => {
        if (!status.isLoaded) return;
        if (!isSeeking.current) {
            setPosition(status.positionMillis);
        }
        setDuration(status.durationMillis);
        setIsPlaying(status.isPlaying);
    };

    const playPause = async () => {
        if (!sound) return;
        const status = await sound.getStatusAsync();
        if (status.isPlaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
    };

    const retroceder = async () => {
        if (sound) {
            const novoTempo = Math.max(position - 5000, 0);
            await sound.setPositionAsync(novoTempo);
        }
    };

    const avancar = async () => {
        if (sound && duration) {
            const novoTempo = Math.min(position + 5000, duration);
            await sound.setPositionAsync(novoTempo);
        }
    };

    const proximaMusica = () => {
        setMusicaAtual((prev) => (prev + 1) % musicas.length);
        
    };

    const musicaAnterior = () => {
        setMusicaAtual((prev) => (prev - 1 + musicas.length) % musicas.length);
    };

    const formatarTempo = (ms) => {
        const totalSegundos = Math.floor(ms / 1000);
        const minutos = Math.floor(totalSegundos / 60);
        const segundos = totalSegundos % 60;
        return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
    };

useFocusEffect(
        React.useCallback(() => {
            // Ao entrar na tela
            return () => {
                // Ao sair da tela
                if (sound) {
                    sound.pauseAsync();
                }
            };
        }, [])
    );
    return (
        <View style={styles.container}>
            <View style={styles.fraseContainer}>
            <Text style={styles.fraseText}>"{musicas[musicaAtual].frase}"</Text>
            <Text style={styles.autorText}> —{musicas[musicaAtual].autor}</Text>
            
            </View>
            <Image
                source={{uri: musicas[musicaAtual].img}}
                style={styles.capa}
            />
            <Text style={styles.nome}>{musicas[musicaAtual].nome}</Text>

            <View style={styles.sliderContainer}>
                <Text>{formatarTempo(position)}</Text>
                <Slider
                    value={position}
                    minimumValue={0}
                    maximumValue={duration}
                    onSlidingStart={() => (isSeeking.current = true)}
                    onSlidingComplete={async (value) => {
                        isSeeking.current = false;
                        if (sound) await sound.setPositionAsync(value);
                    }}
                    thumbTintColor="#2e7d32"
                    minimumTrackTintColor="#2e7d32"
                    style={styles.slider}
                />
                <Text>{formatarTempo(duration)}</Text>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity onPress={musicaAnterior}>
                    <Ionicons name="play-skip-back" size={30} color="#2e7d32" />
                </TouchableOpacity>
                <TouchableOpacity onPress={retroceder}>
                    <Ionicons name="play-back" size={30} color="#2e7d32" />
                </TouchableOpacity>
                <TouchableOpacity onPress={playPause}>
                    <Ionicons name={isPlaying ? "pause" : "play"} size={36} color="#2e7d32" />
                </TouchableOpacity>
                <TouchableOpacity onPress={avancar}>
                    <Ionicons name="play-forward" size={30} color="#2e7d32" />
                </TouchableOpacity>
                <TouchableOpacity onPress={proximaMusica}>
                    <Ionicons name="play-skip-forward" size={30} color="#2e7d32" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
        justifyContent:'center'
    },
    fraseContainer:{
    width: '100%',
    height: 'auto',
    backgroundColor: '#f2fdf3',
    justifyContent: 'center',
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000',
    marginBottom:50
    },
      fraseText: {
    fontSize: 24,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 12,
  },
  autorText: {
    fontSize: 16,
    textAlign: 'right',
    color: '#555',
  },

    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#2e7d32',
    },
    capa: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    nome: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    sliderContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    slider: {
        flex: 1,
        marginHorizontal: 8,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '90%',
        marginBottom: 100,
    },
});