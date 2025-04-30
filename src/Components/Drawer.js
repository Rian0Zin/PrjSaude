import { createDrawerNavigator } from "@react-navigation/drawer";
import { createAppContainer } from 'react-navigation';
import { useNavigation } from '@react-navigation/native';
const navigation = useNavigation();

const Drawer = createDrawerNavigator({
    Home:{
        screen: navigation.useNavigation('Home'),
    },
    IMC:{
        screen: navigation.useNavigation('IMC'),
    }
});

export default createAppContainer(Drawer);