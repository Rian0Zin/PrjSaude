import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
    },
    ultimaMedida: {
        backgroundColor: '#fff',
        width: '90%',
        height: 'auto',
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
        marginTop:10
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
  medidasLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
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
        color: '#000',
    },
    ultimaMedidaItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
      separador: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },

    data: {
        fontSize: 18,
        color: '#555',
    },
    horario: {
        fontSize: 18,
        color: '#555',
    },
    // Estilos para Classificação
    classificacaoContainer: {
        width: '90%',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        
    },
    classificacaoTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    classificacaoTexto: {
        fontSize: 16,
        marginBottom: 5,
    },
    classificacaoNivel: {
        fontWeight: 'bold',
    },
    recomendacao: {
        fontSize: 50,
        color: '#333',
    },

    classificacaoVerde: {
        backgroundColor: '#d4edda',
    },
    classificacaoAmarela: {
        backgroundColor: '#fff3cd',
    },
    classificacaoLaranja: {
        backgroundColor: '#ffe5b4',
    },
    classificacaoVermelha: {
        backgroundColor: '#f8d7da',
    },
    classificacaoCinza: {
        backgroundColor: '#fff',
    },

    historicoPressao: {
        flex: 1,
        backgroundColor: '#fff',
        width: '90%',
        height: 'auto',
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
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
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },

      registroContainer: {
    paddingVertical: 16,
        marginBottom: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
  },

    texto: {
        color: 'green',
        fontSize: 24,
    },

  semRegistros: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
    listaVazia: {
    flex: 1,
    justifyContent: 'center',
  },

    telaInputPressao: {
        backgroundColor: '#fff',
        width: '95%',
        height: '40%',
        borderRadius: 10,
        marginBottom: 5,
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
    tituloInputPressao: {
        fontSize: 25,
        fontWeight: 'bold'
    },

    pressao: {
        fontSize: 38,
        fontWeight: 'bold',
        color: 'black',
        borderBottomWidth: 2,
        borderBottomColor: 'green',
        paddingHorizontal: 20,
    },
    medidaInputPressao: {
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

    colunasPressao: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center'

    },
    linhaPressao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 30,
        marginTop: 10
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
    inputsHoraDia: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        marginTop: 25,
        paddingLeft: 25,
        paddingRight: 25
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
    nivelPressao: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign:'center'
    },

    descricaoPressao: {
        fontSize: 16,
        marginBottom: 12,
    },

    subtituloPerigos: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#d9534f',
    },

    textoPerigos: {
        fontSize: 15,
        marginBottom: 5,
        fontWeight:'bold',
        textAlign:'justify'
    },

    subtituloRecomendacao: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#5cb85c',
    },

    textoRecomendacao: {
        fontSize: 15,
        fontWeight:'bold',
        textAlign:'justify'
    },

    resultadoPressao: {
        backgroundColor: '#fff',
        width: '90%',
        height: '40%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'green',
        borderWidth: 1,
        marginTop:25
    },
    nivelDescricao:{
        marginTop:20,
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    perigos:{
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        padding:10
    },
    recomendacao:{
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        padding:10
    },
    
});
