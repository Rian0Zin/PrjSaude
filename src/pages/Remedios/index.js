import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Remedio({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24 }}>Lembrete de Remédio</Text>
            <Text style={{ fontSize: 18, marginTop: 20 }}>Aqui você pode adicionar lembretes para tomar seus remédios.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

});