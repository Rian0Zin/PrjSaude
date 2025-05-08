import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Header({ title }) {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <FontAwesome6 name="bars" size={30} color="green" />
            </TouchableOpacity>

            <Text style={styles.textoHeader}>{title}</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <AntDesign
                    style={{ borderRadius: 50, borderColor: 'green', borderWidth: 3 }}
                    name="user"
                    size={35}
                    color="green"
                />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%',
        height:60,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor:'white',
        borderWidth:2,
        borderColor:'#CEd4d3'
    },
    textoHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000',
        letterSpacing: 1
    }
});
