import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerGrafico: {
      flex: 0.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    RowBotaoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    columnBotaoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    botaoAdc: {
      width: 150,
      height: 50,
      backgroundColor: '#E8E8E8',
      marginVertical: 2.5,
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
    },
    textoAdc: {
      fontWeight: '600',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalTexto: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
    },
  });
  