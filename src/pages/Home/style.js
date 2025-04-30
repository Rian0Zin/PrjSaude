import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  containerItems: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: "40%",
  },
  card: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E3E3",
    borderRadius: 5,
    margin: 10,
  },
  cardImg: {
    flex: 0.9,
    borderBottomWidth:1,
    borderBottomColor:'#E5E3E3',
    width: "100%",
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardTexto: {
    flex: 0.1,
    padding: 10,
    justifyContent: "space-around",
  },
  titulo:{
    fontSize:17,
    fontWeight:700
  },
  subTitulo:{
    color:'grey',
  },
});
