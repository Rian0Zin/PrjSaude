import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        gap: 25,
        },
    imagemTopo: {
    },
    imagemPeso:{
        textAlign: 'justify',
        gap: 25,
        position:'fixed'
    },
    infosImc:{
        gap:20,
        top:120,
        
    },
    baguisParado: {
       alignItems:'center',
       gap: 25,
    },
    icones: {
        flexDirection: 'row',
        gap:10
        
    }, 
    containerInputsButton: {
        width: '90%', 
        gap: 15,
        
    },
    enfermidades:{
        gap:20
    }

})