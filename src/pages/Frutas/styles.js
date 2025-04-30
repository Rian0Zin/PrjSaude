import { StyleSheet } from "react-native";
export default StyleSheet.create({
    containerSafeArea: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
  
    },
    containerBarraPesquisa:{
      justifyContent:'center',
      width:'95%',
      margin:10,
      marginTop:10,
    },
    barraPesquisa:{
      padding:5,
      borderWidth:1,
      borderColor:'#8888',
  
    },
    imgBarraPesquisa:{
      position: 'absolute',
      top:7,
      left: '93%',
      width: 20, 
      height: 20,
      backgroundColor:'white'
    },
  
    containerConteudo:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      height: '88%',
      maxHeight: '88%',
      marginTop:10,
  
    },
  
    card: {
        borderWidth: 1,
        borderColor: '#E9E9E9',
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 5},
        shadowOpacity: 0.9,
        shadowRadius: 10,
        minHeight: 150,
        minWidth: 350,
        width: '100%',
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginBottom:25
    },
    imagemCard:{
      borderWidth:1,
      borderRadius: 5,
      borderColor:'#8888',
      width:'45%',
      height:'100%',
      backgroundColor:'white',
      alignItems:'center',
      justifyContent:'center',
      
    },
    image:{
      width:'100%',
      height:'100%',
      objectFit:'cover',
      borderRadius: 5,
    },
    textoCard:{
      alignItems:'center',
      justifyContent:'center',
      width:'55%',
    },
    textoCalorias:{
      paddingVertical:'5%'
    },
  
  });
  