import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fraseContainer: {
    width: '100%',
    height: '35%',
    backgroundColor: '#f2fdf3',
    justifyContent: 'center',
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  fraseText: {
    fontSize: 24,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 12,
  },
  autorText: {
    fontSize: 16,
    textAlign: 'right',
    color: '#555',
  },
  botao: {
    marginTop: 40,
    backgroundColor: '#fff', 
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#4caf50',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  textoBotao: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  }
})

  