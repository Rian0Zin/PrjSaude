import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, StyleSheet, Animated, useAnimatedValue } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { useState, useEffect, useRef} from "react";

export default function Vacinas() {

    const [faixaEtaria, setFaixaEtaria] = useState('criança');
    const options = [
        { label: "Criança", value: "criança", activeColor: 'green', imageIcon: require('../../../assets/criancinha.png') },
        { label: "Adulto", value: "adulto", activeColor: 'green', imageIcon: require('../../../assets/adulto.png') },
        { label: "Idoso", value: "idoso", activeColor: 'green', imageIcon: require('../../../assets/idoso.png') }
    ];
    
    const animatedCrianca = useRef(new Animated.Value(0)).current; // Inicialmente invisível
    const animatedAdulto= useRef(new Animated.Value(0)).current; // Inicialmente invisível
    const animatedIdoso = useRef(new Animated.Value(0)).current; // Inicialmente invisível

        useEffect(() => {
            // Sempre que o usuário mudar a opção, animamos a opacidade
            Animated.timing(animatedCrianca, {
                toValue: faixaEtaria === "criança" ? 1 : 0, // 1 para aparecer, 0 para desaparecer
                duration: 250, // Tempo da animação em ms
                useNativeDriver: true, 
            }).start();
            Animated.timing(animatedAdulto, {
                toValue: faixaEtaria === "adulto"? 1: 0,
                duration: 250,
                useNativeDriver: true, 
            }).start();
            Animated.timing(animatedIdoso, {
                toValue: faixaEtaria === "idoso"? 1: 0,
                duration: 250,
                useNativeDriver: true, 
            }).start();
        }, [faixaEtaria]);


    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 30, flex: 1, backgroundColor: '#f5f5f5' }}>
            <Text style={styles.tituloCalendario}>Calendário de Vacinação</Text>
            <View style={{ width: '100%', height: 25 }}>
                <SwitchSelector options={options}  initial={0}  onPress={value=> setFaixaEtaria(value)} />
            </View>

            <ScrollView style={{ width: '100%' }}>
            {faixaEtaria === 'criança' && (
            <Animated.View style={{opacity: animatedCrianca}}>
                <View style={styles.card}>
                    <View style={styles.tituloCard}>
                        <Text style={styles.tituloTexto}> Ao nascer:</Text>
                        <View style={styles.linha} />
                    </View>
                    <View style={styles.textosVacinas}>
                        <Text>- Vacina BCG</Text>
                        <Text>- Vacina Hepatite B</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.tituloCard}>
                        <Text style={styles.tituloTexto}>2 meses:</Text>
                        <View style={styles.linha} />
                    </View>
                    <View style={styles.textosVacinas}>
                        <Text>- Vacina Pentavalente (DTP-HB-Hib)</Text>
                        <Text>- Vacina VIP (Vacina Inativada Poliomielite) </Text>
                        <Text>- Vacina Pneumocócica 10-valente  </Text>
                        <Text>- Vacina Rotavírus  </Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.tituloCard}>
                        <Text style={styles.tituloTexto}>3 meses:</Text>
                        <View style={styles.linha} />
                    </View>
                    <View style={styles.textosVacinas}>
                        <Text>- Vacina Meningocócica C </Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.tituloCard}>
                        <Text style={styles.tituloTexto}> 4 meses:</Text>
                        <View style={styles.linha} />
                    </View>
                    <View style={styles.textosVacinas}>
                        <Text>- Segunda dose de todas as vacinas aplicadas aos 2 meses </Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.tituloCard}>
                        <Text style={styles.tituloTexto}> 5 meses: </Text>
                        <View style={styles.linha} />
                    </View>
                    <View style={styles.textosVacinas}>
                        <Text>- Segunda dose da Meningocócica </Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.tituloCard}>
                        <Text style={styles.tituloTexto}> 6 meses: </Text>
                        <View style={styles.linha} />
                    </View>
                    <View style={styles.textosVacinas}>
                        <Text>- Terceira dose da Pentavalente </Text>
                        <Text>- Terceira dose da VIP</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.tituloCard}>
                        <Text style={styles.tituloTexto}> 9 meses: </Text>
                        <View style={styles.linha} />
                    </View>
                    <View style={styles.textosVacinas}>
                        <Text>- Febre amarela</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.tituloCard}>
                        <Text style={styles.tituloTexto}> 12 meses (1 ano): </Text>
                        <View style={styles.linha} />
                    </View>
                    <View style={styles.textosVacinas}>
                        <Text>- Tríplice viral (sarampo, caxumba e rubéola) </Text>
                        <Text>- Pneumocócica 10-valente (reforço)</Text>
                        <Text>- Meningocócica C (reforço) </Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.tituloCard}>
                        <Text style={styles.tituloTexto}> 15 meses (1 ano e 3 meses): </Text>
                        <View style={styles.linha} />
                    </View>
                    <View style={styles.textosVacinas}>
                        <Text>- DTP (tríplice bacteriana: difteria, tétano, coqueluche) – reforço </Text>
                        <Text>- VOP (Vacina Oral Poliomielite) – reforço</Text>
                        <Text>- Hepatite A </Text>
                        <Text>- Tetra viral (sarampo, caxumba, rubéola e varicela)</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.tituloCard}>
                        <Text style={styles.tituloTexto}> 4 anos: </Text>
                        <View style={styles.linha} />
                    </View>
                    <View style={styles.textosVacinas}>
                        <Text>- DTP (2º reforço)</Text>
                        <Text>- VOP (2º reforço)</Text>
                        <Text>- Varicela</Text>
                        <Text>- Febre amarela (2ª dose, se necessário)</Text>
                    </View>
                </View>
                </Animated.View>
                )}

                {faixaEtaria === 'adulto' && (

                <Animated.View style={{opacity: animatedAdulto}}>
                <View style={styles.card}>
                    <View style={styles.tituloCard}>
                        <Text style={styles.tituloTexto}> Vacinas essenciais: </Text>
                        <View style={styles.linha} />
                    </View>
                    <View style={styles.textosVacinas}>
                        <Text>- Hepatite B (três doses, caso não tenha tomado antes)</Text>
                        <Text>- Tríplice viral (sarampo, caxumba e rubéola – duas doses até os 29 anos e uma dose dos 30 aos 59 anos)</Text>
                        <Text>- Febre amarela (dose única para quem mora ou viaja para áreas de risco)</Text>
                        <Text>- Dupla adulto (difteria e tétano – reforço a cada 10 anos)</Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.tituloCard}>
                        <Text style={styles.tituloTexto}> Vacinas recomendadas para grupos específicos: </Text>
                        <View style={styles.linha} />
                    </View>
                    <View style={styles.textosVacinas}>
                        <Text>- HPV (mulheres até 45 anos e homens até 26 anos, se não vacinados antes) </Text>
                        <Text>- Gripe (anualmente para gestantes, puérperas, trabalhadores da saúde e grupos de risco)</Text>
                        <Text>- Meningocócica ACWY e B (para trabalhadores da saúde e pessoas imunossuprimidas)</Text>
                        <Text>- Pneumocócica 23-valente (para grupos de risco) </Text>
                    </View>
                </View>

                </Animated.View>
                  )}
                {faixaEtaria === 'idoso' && (
                <Animated.View style={{opacity: animatedIdoso}}>
                <View style={styles.card}>
                    <View style={styles.tituloCard}>
                        <Text style={styles.tituloTexto}> Vacinas essenciais: </Text>
                        <View style={styles.linha} />
                    </View>
                    <View style={styles.textosVacinas}>
                        <Text>- Influenza (gripe) – anual</Text>
                        <Text>- Pneumocócica 23-valente (protege contra pneumonia e meningite)  </Text>
                        <Text>- Dupla adulto (difteria e tétano – reforço a cada 10 anos)</Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.tituloCard}>
                        <Text style={styles.tituloTexto}> Vacinas recomendadas para grupos específicos: </Text>
                        <View style={styles.linha} />
                    </View>
                    <View style={styles.textosVacinas}>
                        <Text>- Hepatite B (se não tomou antes) </Text>
                        <Text>- Febre amarela (se estiver em área de risco e recomendada pelo médico) </Text>
                        <Text>- Herpes-zóster (protege contra o "cobreiro") </Text>
                    </View>
                </View>
                </Animated.View>
                 )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    tituloCalendario:{
        fontSize:35, textAlign:'center',color:'green',margin:40,fontWeight: 'bold',
    },
    card: {
        width: '90%',
        backgroundColor: "white",
        padding: 15, //distanciamento entre o conteudo e as margens do card, resumidamente deixa o card mais largo para ele não ficar só fechado no conteudo
        borderWidth: 3,
        borderColor: "#E5E3E3",
        borderRadius: 10, // afina as bordas k
        marginVertical: 10,
        alignSelf: 'center',
    },
    tituloCard: {
            marginBottom: 10, // separa a view de titulo e linha do restante do conteudo
        },
    tituloTexto: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    linha: {
        height: 3,
        backgroundColor: '#CDCDCD',
        marginTop: 5,
    },
    textosVacinas:{
        gap:10,
        
    }
});