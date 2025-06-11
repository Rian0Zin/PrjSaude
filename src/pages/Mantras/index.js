import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Audio } from 'expo-av';
import { Slider } from '@react-native-assets/slider';
import { Ionicons } from '@expo/vector-icons';

export default function AudioPlayer({ navigation }) {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const isSeeking = useRef(false);

    const audioFile = require('../../../assets/mantraCalmaria.mp3'); // Altere o caminho conforme necessário

    useEffect(() => {
        carregarAudio();
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    const carregarAudio = async () => {
        const { sound: novoSom } = await Audio.Sound.createAsync(
            audioFile,
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

    const formatarTempo = (ms) => {
        const totalSegundos = Math.floor(ms / 1000);
        const minutos = Math.floor(totalSegundos / 60);
        const segundos = totalSegundos % 60;
        return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
    };

    return (
        <View style={styles.container}>
            <Text>

            </Text>
            <Image
                source={{uri:'https://f4.bcbits.com/img/a1908449552_16.jpg'}} // Altere para sua imagem
                style={styles.capa}
            />
            <Text style={styles.nome}>Mantra da Calmaria</Text>

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
                <TouchableOpacity onPress={retroceder}>
                    <Ionicons name="play-back" size={30} color="#2e7d32" />
                </TouchableOpacity>
                <TouchableOpacity onPress={playPause}>
                    <Ionicons name={isPlaying ? "pause" : "play"} size={36} color="#2e7d32" />
                </TouchableOpacity>
                <TouchableOpacity onPress={avancar}>
                    <Ionicons name="play-forward" size={30} color="#2e7d32" />
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
        width: '60%',
        marginTop: 30,
    },
});
