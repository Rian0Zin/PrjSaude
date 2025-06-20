import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import react,{useEffect,useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export default function Home({navigation}) {
const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const dados = await AsyncStorage.getItem('usuario');
        if (dados) {
          const usuarioParse = JSON.parse(dados);
          setUsuario(usuarioParse);
        } else {
          console.log('Nenhum usuário encontrado');
        }
      } catch (erro) {
        console.error('Erro ao carregar do AsyncStorage:', erro);
      }
    }

    carregarUsuario();
  }, []);
  

  return (
    <View style={styles.container}>
      <View style={{flex:0.6}}>
        <View style={{flex:0.9, justifyContent:'center', alignItems:'center',padding:20}}>
          <Image style={{width:'100%', height:'100%', resizeMode:'contain'}} source={{uri:'https://static.vecteezy.com/system/resources/previews/015/693/459/large_2x/healthy-lifestyle-habits-free-png.png'}}/>
        </View>
        <View style={{flex:0.1, justifyContent:'center', alignItems:'center',padding:20}}>
          <Text style={styles.titulo}>Tudo que você precisa em um só lugar!</Text>
          <Text style={styles.subTitulo}>Stay natty!</Text>
        </View>
      </View>
      <View style={{flex:0.4,  overflow: 'hidden'}}>
      <ScrollView
        style={styles.containerItems}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
         <TouchableOpacity onPress={() => navigation.navigate('IMC')}>
        <View style={styles.card}>
          <Image
            style={styles.cardImg}
            source={{ uri: "https://img.freepik.com/vetores-gratis/ilustracao-em-vetor-conceito-abstrato-de-indice-de-massa-corporal-diagnostico-de-problemas-de-saude-programa-de-perda-de-peso-indice-de-gordura-corporal-imc-saudavel-formula-de-calculo-metafora-abstrata-do-plano-de-nutricao_335657-4039.jpg" }}
          />
          <View style={styles.cardTexto}>
            <Text>Ver IMC</Text>
            
          </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Água')}>
        <View style={styles.card}>
          <Image
            style={styles.cardImg}
            source={{ uri: "https://thumbs.dreamstime.com/b/happy-young-woman-drinking-water-girl-glass-253077006.jpg" }}
          />
          <View style={styles.cardTexto}>
            <Text>Tomar água</Text>
            
          </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Frutas')}>
        <View style={styles.card}>
          <Image
            style={styles.cardImg}
            source={{ uri: "https://th.bing.com/th/id/OIP.9GSiQCyx0j5dWSeU1rhCmAAAAA?rs=1&pid=ImgDetMain" }}
          />
          <View style={styles.cardTexto}>
            <Text>Ver calórias</Text>
            
          </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Vacinas')}>
        <View style={styles.card}>
          <Image
            style={styles.cardImg}
            source={{ uri: "https://img.freepik.com/free-vector/flat-hand-drawn-doctor-injecting-vaccine-patient_23-2148869171.jpg?t=st=1743571689~exp=1743575289~hmac=0680f6cea84bb365c457ba81ca78c44fba8e4d80dfb3b7bf60b8a75f2234a453&w=740" }}
          />
          <View style={styles.cardTexto}>
            <Text>Calendário de vacinação</Text>
            
          </View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Lembretes de remedio')}>
        <View style={styles.card}>
          <Image
            style={styles.cardImg}
            source={{ uri: "https://cdn3.iconfinder.com/data/icons/healthcare-37/64/reminder-pills-512.png" }}
          />
          <View style={styles.cardTexto}>
            <Text>Lembrete de remédio</Text>
            
          </View>
        </View>     
        </TouchableOpacity>
               
        <TouchableOpacity onPress={() => navigation.navigate('Diabetes')}>
        <View style={styles.card}>
          <Image
            style={styles.cardImg}
            source={{ uri: "https://media.istockphoto.com/id/1302936488/pt/vetorial/person-do-glucose-test-measuring-sugar-in-blood-concept-vector.jpg?s=612x612&w=0&k=20&c=u37P5RgxC5V-tUkAmGcOYUISwV-fQKZ9dc7tNI5Ekds=" }}
          />
          <View style={styles.cardTexto}>
            <Text>Registre sua glicemia</Text>
            
          </View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Pressão')}>
        <View style={styles.card}>
          <Image
            style={styles.cardImg}
            source={{ uri: "https://media.istockphoto.com/id/695935540/pt/vetorial/blood-pressure-icon.jpg?s=612x612&w=0&k=20&c=XjUdBknCxNPuD8a3CHEInIv_LwrwaCDhpf7Kz1MZovY=" }}
          />
          <View style={styles.cardTexto}>
            <Text>Pressão Arterial</Text>
            
          </View>
        </View>
        </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Frases Motivacionais')}>
        <View style={styles.card}>
          <Image
            style={styles.cardImg}
            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQpBZ2iO8Ieh6BXokT0TBjXFOHjzZEE_C7OQ&s" }}
            //https://img.freepik.com/vetores-premium/ilustracao-de-design-plano-moderno-de-motivacao_566886-363.jpg
          />
          <View style={styles.cardTexto}>
            <Text>Frases motivacionais</Text>
            
          </View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Dicas para dormir')}>
        <View style={styles.card}>
          <Image
            style={styles.cardImg}
            source={{ uri: "https://media.istockphoto.com/id/1357733473/pt/vetorial/sweet-dreams-concept.jpg?s=612x612&w=0&k=20&c=T_WOymJSWbQ5RQ_gB--WX1s4iJdbGWoEd9SnDwyKb1Y=" }}
          />
          <View style={styles.cardTexto}>
            <Text>Dicas para dormir</Text>
            
          </View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Mantras')}>
        <View style={styles.card}>
          <Image
            style={styles.cardImg}
            source={{ uri: " https://media.istockphoto.com/id/2027577054/pt/vetorial/woman-meditating-with-closed-eyes-sitting-cross-legged-on-floor-and-doing-yoga-lotus-pose.jpg?s=612x612&w=0&k=20&c=jQ8JgnFoerXxnYuPjQ4-OEdS6BTBX25PJaEdMdUjghA=" }}
          />
          <View style={styles.cardTexto}>
            <Text>Mantras</Text>
            
          </View>
        </View>
        </TouchableOpacity>
       

      </ScrollView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white'
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
