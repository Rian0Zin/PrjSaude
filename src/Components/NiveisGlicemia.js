import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NiveisGlicemia = ({ baixa, normal, alta }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Níveis de Glicemia</Text>

      <View style={styles.item}>
        <Text style={styles.legenda}>Baixa ({baixa}%)</Text>
        <View style={styles.barra}>
          <View style={[styles.barraInterna, { width: `${baixa}%`, backgroundColor: '#3498db' }]} />
        </View>
      </View>

      <View style={styles.item}>
        <Text style={styles.legenda}>Normal ({normal}%)</Text>
        <View style={styles.barra}>
          <View style={[styles.barraInterna, { width: `${normal}%`, backgroundColor: '#2ecc71' }]} />
        </View>
      </View>

      <View style={styles.item}>
        <Text style={styles.legenda}>Alta ({alta}%)</Text>
        <View style={styles.barra}>
          <View style={[styles.barraInterna, { width: `${alta}%`, backgroundColor: '#e74c3c' }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
        backgroundColor: '#fff',
        width: '90%',
        height: 'auto',
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  item: {
    marginBottom: 12,
  },
  legenda: {
    marginBottom: 4,
    fontWeight: '600',
  },
  barra: {
    height: 20,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    overflow: 'hidden',
  },
  barraInterna: {
    height: '100%',
    borderRadius: 10,
  },
});

export default NiveisGlicemia;
