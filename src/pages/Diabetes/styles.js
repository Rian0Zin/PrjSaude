import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ultimaMedida: {
        backgroundColor: '#fff',
        width: '90%',
        height: 'auto',
        borderRadius: 10,
        marginBottom: 20,
        marginTop:50,
        padding: 10,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom:15
    },
    ultimaMedidaItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:15
    },
        medidaItem: {
        alignItems: 'center',
        flex: 1,
    },
    medidaTitulo: {
        fontSize: 14,
        color: '#666',
    },
    qntMedida: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center',
        marginBottom:15,
    },
    graficoUltimosDias: {
        backgroundColor: '#fff',
        width: '90%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
    },
    tituloGrafico: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    graficoLinha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 40,
    },
    historicoGlicemia: {
        backgroundColor: '#fff',
        width: '90%',
        height: 'auto',
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
    },

    viewTituloHistorico: {
        flexDirection:'row',
        alignItems: 'center',
        paddingBottom: 10,
        textAlign: 'center',
        justifyContent:'center'
    },
    tituloHistorico: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    historicoGlicemiaItem: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    historicoGlicemiaValor: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    dataHoraHistorico: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    telaInputGlicemia: {
        backgroundColor: '#fff',
        width: '90%',
        height: '40%',
        borderRadius: 10,
        marginBottom: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'green',
        borderWidth: 1
    },
    displayContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    label: {
        fontSize: 18,
        color: '#fff',
    },
    tituloInputGlicemia: {
        fontSize: 25,
        fontWeight: 'bold'
    },

    glicemia: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'black',
        borderBottomWidth: 2,
        borderBottomColor: 'green',
        paddingHorizontal: 20,
    },
    medidaInputGlicemia: {
        fontSize: 20,
        color: 'black',
        marginTop: 5,
    },

    teclado: {
        marginTop: 15,
        borderWidth: 1,
        height: '45%',
        width: '90%',
        borderColor: 'black',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: 'green'


    },
    linha: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    botao: {
        width: 70,
        height: 70,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoTexto: {
        fontSize: 30,
        color: 'black',
    },

    viewBotaoAdicionar: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'green',
        borderTopColor: 'green'
    },

    botaoAdicionar: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 40,
    },

    telaInputGlicemiaPasso2: {
        backgroundColor: '#fff',
        width: '90%',
        height: '30%',
        borderRadius: 10,
        marginBottom: 15,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'green',
        borderWidth: 1
    },

    inputHorario: {
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        fontSize: 16,
        width: 120,
        textAlign: 'center',
    },
    inputData: {
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        fontSize: 16,
        width: 120,
        textAlign: 'center',
    },
    inputsHoraDia: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between'
    },
    tituloRefeicao: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    pickerRefeicao: {
        width: '85%',
        borderRadius: 10,
        borderColor: 'green',
        borderWidth: 1,

    },
    indicadores: {
        backgroundColor: '#fff',
        width: '90%',
        height: 'auto',
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
    },

    legenda: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },

    barra: {
        width: '100%',
        height: 20,
        backgroundColor: '#eee',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
    },

    barraInterna: {
        height: '100%',
        borderRadius: 10,
    },
    historicoGlicemiaPeriodoRefeicao: {
        marginBottom: 10,
        fontWeight: 'semibold'
    },
      botaoFlutuante: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'green', 
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // sombra no Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  texto: {
    color: 'green',
    fontSize: 24,
  },
});
