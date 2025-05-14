import React, { useState, Fragment, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

export default function FazerRegistroPressao({ navigation }) {

    const [sistolica, setSistolica] = useState('');
    const [diastolica, setDiastolica] = useState('');
    const [pulso, setPulso] = useState('');
    const [campoSelecionado, setCampoSelecionado] = useState('sistolica');
    const [passo, setPasso] = useState(0);

    const sistolicaRef = useRef(null);
    const diastolicaRef = useRef(null);
    const pulsoRef = useRef(null);

    const adicionarNumero = (num) => {
        const atual = { sistolica, diastolica, pulso };
        const setters = { sistolica: setSistolica, diastolica: setDiastolica, pulso: setPulso };

        if (atual[campoSelecionado].length >= (campoSelecionado === 'pulso' ? 3 : 2)) return;

        const novoValor = atual[campoSelecionado] + num;
        setters[campoSelecionado](novoValor);

        // Lógica de troca de campo
        if (campoSelecionado === 'sistolica' && novoValor.length === 2) {
            setCampoSelecionado('diastolica');
        } else if (campoSelecionado === 'diastolica' && novoValor.length === 2) {
            setCampoSelecionado('pulso');
        }
    };

    const apagarUltimo = () => {
        const atual = { sistolica, diastolica, pulso };
        const setters = { sistolica: setSistolica, diastolica: setDiastolica, pulso: setPulso };

        setters[campoSelecionado](atual[campoSelecionado].slice(0, -1));
    };

    const obterClassificacao = (sis, dia) => {
        sis = parseInt(sis);
        dia = parseInt(dia);

        if (isNaN(sis) || isNaN(dia)) {
            return {
                nivel: 'Indefinido',
                cor: styles.classificacaoCinza,
                descricao: 'Medição incompleta ou inválida.',
                perigos: 'Não é possível determinar os riscos sem uma medição válida.',
                recomendacao: 'Tente novamente preenchendo corretamente os valores.',
            };
        }

        if (sis < 120 && dia < 80) {
            return {
                nivel: 'Normal',
                cor: styles.classificacaoVerde,
                descricao: 'Sua pressão arterial está dentro da faixa ideal.',
                perigos: 'Nenhum risco evidente no momento.',
                recomendacao: 'Continue com hábitos saudáveis como boa alimentação, exercícios e sono adequado.',
            };
        } else if ((sis >= 120 && sis <= 129) && dia < 80) {
            return {
                nivel: 'Elevada',
                cor: styles.classificacaoAmarela,
                descricao: 'Sua pressão está um pouco acima do ideal, mas ainda não é considerada hipertensão.',
                perigos: 'Pode evoluir para hipertensão se não houver mudanças no estilo de vida.',
                recomendacao: 'Reduza o consumo de sal, evite o estresse e pratique atividades físicas regularmente.',
            };
        } else if ((sis >= 130 && sis <= 139) || (dia >= 80 && dia <= 89)) {
            return {
                nivel: 'Hipertensão Estágio 1',
                cor: styles.classificacaoLaranja,
                descricao: 'Você está no primeiro estágio da hipertensão.',
                perigos: 'Aumenta o risco de problemas cardíacos, AVC e doenças renais.',
                recomendacao: 'Consulte um profissional de saúde para avaliar necessidade de tratamento e mudanças no estilo de vida.',
            };
        } else if (sis >= 140 || dia >= 90) {
            return {
                nivel: 'Hipertensão Estágio 2',
                cor: styles.classificacaoVermelha,
                descricao: 'Pressão significativamente elevada.',
                perigos: 'Risco alto de infarto, AVC, insuficiência cardíaca e danos a órgãos como rins e olhos.',
                recomendacao: 'Procure atendimento médico o quanto antes. Pode ser necessário iniciar medicamentos.',
            };
        } else {
            return {
                nivel: 'Indefinido',
                cor: styles.classificacaoCinza,
                descricao: 'Não foi possível determinar a classificação.',
                perigos: 'Valores atípicos ou incompletos impedem a análise.',
                recomendacao: 'Verifique os dados inseridos e tente novamente.',
            };
        }
    };

    const estadoAutal = obterClassificacao(sistolica, diastolica);

    useFocusEffect(
        useCallback(() => {
            setSistolica('');
            setDiastolica('');
            setPulso('');
            setPasso(0);
        }, [])
    );
    return (
        <SafeAreaView style={styles.container}>
            {passo === 0 && (
                <Fragment>
                    <View style={styles.telaInputPressao}>
                        <Text style={styles.tituloInputPressao}>Pressão Arterial</Text>
                        <View style={styles.linhaPressao}>
                            <TouchableOpacity
                                style={styles.colunasPressao}
                                onPress={() => setCampoSelecionado('sistolica')}
                            >
                                <Text style={styles.medidaInputPressao}>Sistólica</Text>
                                <Text style={styles.pressao}>{sistolica || '--'}</Text>
                                <Text style={styles.medidaInputPressao}>mmHg</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.colunasPressao}
                                onPress={() => setCampoSelecionado('diastolica')}
                            >
                                <Text style={styles.medidaInputPressao}>Diastólica</Text>
                                <Text style={styles.pressao}>{diastolica || '--'}</Text>
                                <Text style={styles.medidaInputPressao}>mmHg</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.colunasPressao}
                                onPress={() => setCampoSelecionado('pulso')}
                            >
                                <Text style={styles.medidaInputPressao}>Pulso</Text>
                                <Text style={styles.pressao}>{pulso || '--'}</Text>
                                <Text style={styles.medidaInputPressao}>bpm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.teclado}>
                        {[['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['0', 'apagar']].map(
                            (linha, index) => (
                                <View key={index} style={styles.linha}>
                                    {linha.map((item) => (
                                        <TouchableOpacity
                                            key={item}
                                            onPress={() =>
                                                item === 'apagar' ? apagarUltimo() : adicionarNumero(item)
                                            }
                                            style={styles.botao}
                                        >
                                            <Text style={styles.botaoTexto}>
                                                {item === 'apagar' ? '⌫' : item}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )
                        )}
                    </View>

                    <View style={styles.viewBotaoAdicionar}>
                        <TouchableOpacity onPress={() => setPasso(1)} style={styles.botaoAdicionar}>
                            <Text>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                </Fragment>
            )}
            {passo === 1 && (
                <Fragment>
                    <View style={styles.telaInputPressao}>
                        <Text style={styles.tituloInputPressao}>Pressão Arterial</Text>
                        <View style={styles.linhaPressao}>
                            <View style={styles.colunasPressao}>
                                <Text style={styles.medidaInputPressao}>Sistólica</Text>
                                <Text style={styles.pressao}>{sistolica || '--'}</Text>
                                <Text style={styles.medidaInputPressao}>mmHg</Text>
                            </View>

                            <View style={styles.colunasPressao}>
                                <Text style={styles.medidaInputPressao}>Diastólica</Text>
                                <Text style={styles.pressao}>{diastolica || '--'}</Text>
                                <Text style={styles.medidaInputPressao}>mmHg</Text>
                            </View>

                            <View style={styles.colunasPressao}>
                                <Text style={styles.medidaInputPressao}>Pulso</Text>
                                <Text style={styles.pressao}>{pulso || '--'}</Text>
                                <Text style={styles.medidaInputPressao}>bpm</Text>
                            </View>
                        </View>
                        <View style={styles.inputsHoraDia}>
                            <TextInput
                                style={styles.inputHorario}
                                keyboardType="numeric"
                                maxLength={5}
                                placeholder="00:00"
                            />
                            <TextInput
                                style={styles.inputData}
                                keyboardType="numeric"
                                maxLength={10}
                                placeholder="dd/mm/aaaa"
                            />
                        </View>
                    </View>
                    <View style={styles.resultadoPressao}>
                        <Text style={styles.tituloInputPressao}>Resultado</Text>
                        <View style={styles.nivelDescricao}>
                            <Text style={[styles.nivelPressao, estadoAutal.cor]}>
                                Nível: {estadoAutal.nivel}
                            </Text>

                            <Text style={styles.descricaoPressao}>
                                {estadoAutal.descricao}
                            </Text>
                        </View>
                        <View style={styles.perigos}>
                            <Text style={styles.subtituloPerigos}>Perigos associados:</Text>
                            <Text style={styles.textoPerigos}>
                                {estadoAutal.perigos}
                            </Text>
                        </View>
                        <View style={styles.recomendacao}>
                            <Text style={styles.subtituloRecomendacao}>Recomendação:</Text>
                            <Text style={styles.textoRecomendacao}>
                                {estadoAutal.recomendacao}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.viewBotaoAdicionar}>
                        <TouchableOpacity onPress={() => setPasso(1)} style={styles.botaoAdicionar}>
                            <Text>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </Fragment>

            )}
        </SafeAreaView>
    );
}
