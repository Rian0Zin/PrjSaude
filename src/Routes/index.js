import { StatusBar } from 'expo-status-bar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, Image, StyleSheet} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Home from '../pages/Home';
import Sobre from '../pages/Sobre';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Header from '../Components/Header';
import Frutas from '../pages/Frutas';
import IMC from '../pages/IMC/index';
import BeberAgua from '../pages/BeberAgua/BeberAgua';
import Vacinas from '../pages/Vacinas';
import Diabetes from '../pages/Diabetes';
import Login from '../pages/Login';
import Registro from '../pages/Login';
import LoginReal from '../pages/Login/login';
import DigitarDadosRemedio from '../pages/Remedios/digitarDadosRemedio';
import Remedio from '../pages/Remedios';
import FazerRegistroDiabete from '../pages/Diabetes/fazerRegistroDiabete';
import Pressao from '../pages/Pressão';
import FazerRegistroPressao from '../pages/Pressão/fazerRegistroPressao';
import Splash from '../pages/Splash';
import FrasesMotivacionais from '../pages/FrasesMotivacionais';
import DicasDormir from '../pages/DicasDormir';
import Mantras from '../pages/Mantras';
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Drawer.Navigator initialRouteName="Splash">
        <Drawer.Screen name="Splash" component={Splash} options={{ headerShown: false, drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen  name='Home' component={Home} options={{header:()=> <Header title='Home' />}} />
        <Drawer.Screen name='Registro' component={Registro} options={{header:()=> <Header title='Seu perfil'/>, drawerItemStyle: { display: 'none' },  }}  />
        <Drawer.Screen name='Login' component={Login} options={{header:()=> <Header title='Registro'/>, drawerItemStyle: { display: 'none' },  }}  />
        <Drawer.Screen name='IMC' component={IMC} options={{header:()=> <Header title='IMC'/>}}  />
        <Drawer.Screen name='Sobre' component={Sobre} options={{header:()=> <Header title='Sobre'/>, drawerItemStyle:{display:'none'}}}   />
        <Drawer.Screen name='Frutas' component={Frutas} options={{header:()=> <Header title='Calorias'/>}}/>
        <Drawer.Screen name='Água' component={BeberAgua} options={{header:()=> <Header title='Beber Água'/>}}/>
        <Drawer.Screen name='Vacinas' component={Vacinas} options={{header:()=> <Header title='Vacinação'/>}}/>
        <Drawer.Screen name='Remedio' component={DigitarDadosRemedio} options={{header:()=> <Header title='Medicamentos'/>,  drawerItemStyle:{display:'none'}}}/>
        <Drawer.Screen name='Lembretes de remedio' component={Remedio} options={{header:()=> <Header title='Medicamentos'/>,}}/>
        <Drawer.Screen name='Diabetes' component={Diabetes} options={{header:()=> <Header title='Diabetes'/>}}/>
        <Drawer.Screen name='Digitar diabete' component={FazerRegistroDiabete}  options={{header:()=> <Header title='Diabetes'/>, drawerItemStyle:{display:'none'}}}/>
        <Drawer.Screen name='Pressão' component={Pressao} options={{header:()=> <Header title='Pressão'/>}}/>
        <Drawer.Screen name='Digitar pressão' component={FazerRegistroPressao} options={{header:()=> <Header title='Pressão'/>, drawerItemStyle:{display:'none'}}}/>
        <Drawer.Screen name='LoginReal' component={LoginReal} options={{header:()=> <Header title='Login'/>, drawerItemStyle: { display: 'none' },  }}  />
        <Drawer.Screen name='Frases Motivacionais' component={FrasesMotivacionais} options={{header:()=> <Header title='Frases motivacionais'/> }}  />
        <Drawer.Screen name='Dicas para dormir' component={DicasDormir} options={{header:()=> <Header title='Dicas para dormir'/> }}  />
        <Drawer.Screen name='Mantras' component={Mantras} options={{header:()=> <Header title='Mantras'/> }}  />

      </Drawer.Navigator>
    </NavigationContainer>
  );
};

