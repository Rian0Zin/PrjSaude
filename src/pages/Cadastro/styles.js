import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        alignContent: 'center',
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
    },

    imgPerfilRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    user: {
        width: 120,           
        height: 120,          
        borderRadius: 70,
        borderWidth: 4,
        borderColor:'white',
        resizeMode: 'cover',     // evita distorções e cortes estranhos
        overflow: 'hidden',      // essencial para cortar o conteúdo que "vaza"
      },
})