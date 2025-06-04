import React, { useState, Fragment, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export default function FazerRegistroPressao({ navigation }) {
    const [sistolica, setSistolica] = useState('');
    const [diastolica, setDiastolica] = useState('');
    const [pulso, setPulso] = useState('');
    const [hora, setHora] = useState('');
    const [data, setData] = useState('');

    const [campoSelecionado, setCampoSelecionado] = useState('sistolica');
    const [passo, setPasso] = useState(0);

    const adicionarNumero = (num) => {
        const atual = { sistolica, diastolica, pulso };
        const setters = { sistolica: setSistolica, diastolica: setDiastolica, pulso: setPulso };

        if (atual[campoSelecionado].length >= (campoSelecionado === 'pulso' ? 3 : 3)) return;

        const novoValor = atual[campoSelecionado] + num;
        setters[campoSelecionado](novoValor);

        // Lógica de troca de campo
        if (campoSelecionado === 'sistolica' && novoValor.length === 3) {
            setCampoSelecionado('diastolica');
        } else if (campoSelecionado === 'diastolica' && novoValor.length === 3) {
            setCampoSelecionado('pulso');
        }
    };

    const apagarUltimo = () => {
        const atual = { sistolica, diastolica, pulso };
        const setters = { sistolica: setSistolica, diastolica: setDiastolica, pulso: setPulso };

        setters[campoSelecionado](atual[campoSelecionado].slice(0, -1));
    };

    const formatarHora = (text) => {
        // Remove tudo que não é número
        let valor = text.replace(/\D/g, '');

        // Aplica a máscara
        if (valor.length > 2) {
            valor = valor.substring(0, 2) + ':' + valor.substring(2, 4);
        }

        // Validação das horas (00-23)
        if (valor.length >= 2) {
            const horas = parseInt(valor.substring(0, 2));
            if (horas > 23) {
                valor = '23' + (valor.length > 2 ? ':' + valor.substring(3) : '');
            }
        }

        // Validação dos minutos (00-59)
        if (valor.length > 3) {
            const minutos = parseInt(valor.substring(3, 5));
            if (minutos > 59) {
                valor = valor.substring(0, 3) + '59';
            }
        }

        // Limita o tamanho
        if (valor.length > 5) {
            valor = valor.substring(0, 5);
        }

        setHora(valor);
    };

    const formatarData = (text) => {
        // Remove tudo que não é número
        let valor = text.replace(/\D/g, '');

        // Aplica a máscara
        if (valor.length > 2) {
            valor = valor.substring(0, 2) + '/' + valor.substring(2);
        }
        if (valor.length > 5) {
            valor = valor.substring(0, 5) + '/' + valor.substring(5);
        }

        // Validação do dia (1-31)
        if (valor.length >= 2) {
            const dia = parseInt(valor.substring(0, 2));
            if (dia > 31) {
                valor = '31' + (valor.length > 2 ? '/' + valor.substring(3) : '');
            } else if (dia < 1) {
                valor = '01' + (valor.length > 2 ? '/' + valor.substring(3) : '');
            }
        }

        // Validação do mês (1-12)
        if (valor.length >= 5) {
            const mes = parseInt(valor.substring(3, 5));
            if (mes > 12) {
                valor = valor.substring(0, 3) + '12' + (valor.length > 5 ? '/' + valor.substring(6) : '');
            } else if (mes < 1) {
                valor = valor.substring(0, 3) + '01' + (valor.length > 5 ? '/' + valor.substring(6) : '');
            }
        }

        // Validação do ano (até 2025)
        if (valor.length >= 10) {
            const ano = parseInt(valor.substring(6, 10));
            if (ano > 2025) {
                valor = valor.substring(0, 6) + '2025';
            }
        }

        // Limita o tamanho
        if (valor.length > 10) {
            valor = valor.substring(0, 10);
        }

        setData(valor);
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

    async function CriarRegistroPressao() {
        try {
            // Verifica se os campos obrigatórios estão preenchidos
            if (!sistolica || !diastolica || !pulso || !hora || !data) {
                alert('Por favor, preencha todos os campos obrigatórios!');
                return;
            }

            // Verifica se a hora está completa
            if (hora.length < 5 || hora.indexOf(':') === -1) {
                alert('Por favor, insira uma hora válida no formato HH:MM');
                return;
            }

            // Verifica se a data está completa
            if (data.length < 10 || data.split('/').length !== 3) {
                alert('Por favor, insira uma data válida no formato DD/MM/AAAA');
                return;
            }

            const url = 'http://127.0.0.1:8081/api/pressao/criar';

            const dados = {
                sistolicaPressao: parseInt(sistolica),
                diastolicaPressao: parseInt(diastolica),
                pulsoPressao: parseInt(pulso),
                horaPressao: hora,
                dataPressao: data
            };

            const response = await axios.post(url, dados, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                alert('Registro salvo com sucesso!');
                navigation.goBack();
            } else {
                alert(`Erro ao salvar: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Erro detalhado:', error.response || error);
            alert(`Erro ao conectar com o servidor: ${error.message}`);
        }
    }

    useFocusEffect(
        useCallback(() => {
            setSistolica('');
            setDiastolica('');
            setPulso('');
            setPasso(0);
            setHora('');
            setData('');
        }, [])
    );
    const estadoAtual = obterClassificacao(sistolica, diastolica);

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
                        <TouchableOpacity
                            onPress={() => {
                                if (!sistolica || !diastolica || !pulso) {
                                    alert('Por favor, preencha todos os campos de pressão!');
                                    return;
                                }
                                setPasso(1);
                            }}
                            style={styles.botaoAdicionar}
                        >
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
                                value={hora}
                                onChangeText={formatarHora}
                                maxLength={5}
                                placeholder="HH:MM"
                            />
                            <TextInput
                                style={styles.inputData}
                                keyboardType="numeric"
                                maxLength={10}
                                value={data}
                                onChangeText={formatarData}
                                placeholder="DD/MM/AAAA"
                            />
                        </View>
                    </View>
                    <View style={styles.resultadoPressao}>
                        <Text style={styles.tituloInputPressao}>Resultado</Text>
                        <View style={styles.nivelDescricao}>
                            <Text style={[styles.nivelPressao, estadoAtual.cor]}>
                                Nível: {estadoAtual.nivel}
                            </Text>

                            <Text style={styles.descricaoPressao}>
                                {estadoAtual.descricao}
                            </Text>
                        </View>
                        <View style={styles.perigos}>
                            <Text style={styles.subtituloPerigos}>Perigos associados:</Text>
                            <Text style={styles.textoPerigos}>
                                {estadoAtual.perigos}
                            </Text>
                        </View>
                        <View style={styles.recomendacao}>
                            <Text style={styles.subtituloRecomendacao}>Recomendação:</Text>
                            <Text style={styles.textoRecomendacao}>
                                {estadoAtual.recomendacao}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.viewBotaoAdicionar}>
                        <TouchableOpacity
                            onPress={CriarRegistroPressao}
                            style={styles.botaoAdicionar}
                        >
                            <Text>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </Fragment>
            )}
        </SafeAreaView>
    );
}