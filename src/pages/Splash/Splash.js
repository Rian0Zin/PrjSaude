import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

export default function Splash({ navigation }) {
  useEffect(() => {
    async function verificarLogin() {
      const usuario = await AsyncStorage.getItem('usuario');

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: usuario ? 'Home' : 'Login' }],
        })
      );
    }

    verificarLogin();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#32A017" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
