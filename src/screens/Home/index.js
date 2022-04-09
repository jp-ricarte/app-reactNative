import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, Alert, Image, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome5";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { useForm, Controller } from "react-hook-form";
import moment from 'moment';
import { Dimensions } from 'react-native';
import "moment/locale/pt-br";
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../services/api";
import { TextInputMask, TextMask } from 'react-native-masked-text';
import { useFonts, OpenSans_600SemiBold, OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import { Container, TextTitle, Wellcome, TextCash, TextCashRed, TextTitleName, FlexRow, CardReceitaDespesa, ViewIcon, FlewRowCenter } from "./styles";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

export default function Home({ navigation }) {
    const [hora, setHora] = useState();
    const [nome, setNome] = useState();
    const [data, setData] = useState([]);
    const [mes, setMes] = useState();
    const [receitaTotal, setReceitaTotal] = useState();
    const [despesaTotal, setDespesaTotal] = useState();

    let [fontsLoaded] = useFonts({
        OpenSans_600SemiBold,
        OpenSans_400Regular
    });

    async function getUser() {
        const nome = await AsyncStorage.getItem('nome');
        setNome(nome);
    }

    async function getDashboard() {
        const idUser = await AsyncStorage.getItem('id');
        try {
            const res = await api.get(`/dashboard/${idUser}`);
            setReceitaTotal(res.data[0].receitaMensal);
            setDespesaTotal(res.data[0].despesaMensal);
            setData(res.data);

        } catch (err) {
            console.log(err);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            setHora(moment().format('HH'));
            setMes(moment().format('MMMM/YYYY'))
            getUser();
            getDashboard();
        }, [])
    );

    return (
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>
            <Container>
                {data.map(data => (
                    <>
                    <View key={data.saldoMensal}>
                        {data.receitaMensal && data.despesaMensal ? (
                            <>
                                <Wellcome>
                                    {hora < '12' && (
                                        <TextTitle style={styles.font}>Bom dia, <TextTitleName>{nome}!</TextTitleName></TextTitle>
                                    )}
                                    {hora >= '12' && hora < '18' && (
                                        <TextTitle style={styles.font}>Boa tarde, <TextTitleName>{nome}!</TextTitleName></TextTitle>
                                    )}
                                    {hora >= '18' && (
                                        <TextTitle style={styles.font}>Boa noite, <TextTitleName>{nome}!</TextTitleName></TextTitle>
                                    )}
                                </Wellcome>
                                <FlewRowCenter>
                                    <Wellcome style={{ marginTop: 0, paddingTop: 5 }}>
                                        <Text style={{ fontFamily: 'OpenSans_400Regular', textAlign: 'center' }}>Receita Mensal:</Text>
                                        <TextTitle style={styles.font}><TextCash> <TextMask value={receitaTotal} type={'money'} /> </TextCash></TextTitle>
                                    </Wellcome>

                                    <Wellcome style={{ marginTop: 0, marginBottom: 0, paddingTop: 0 }}>
                                        <Text style={{ fontFamily: 'OpenSans_400Regular', textAlign: 'center' }}>Despesa Mensal:</Text>
                                        <TextTitle style={styles.font}><TextCashRed>- <TextMask value={despesaTotal} type={'money'} /> </TextCashRed></TextTitle>
                                    </Wellcome>
                                </FlewRowCenter>

                                <Wellcome style={{ marginTop: 0, paddingTop: 5 }}>
                                    <Text style={styles.font}>Seu saldo nesse mês de <Text style={{ fontWeight: 'bold' }}>{mes}</Text> é:</Text>
                                    {data.saldoResultado == 'Lucro' ? (
                                        <TextTitle style={styles.font}><TextCash> <TextMask value={data.saldoMensal} type={'money'} /> </TextCash></TextTitle>

                                    ) : (
                                        <TextTitle style={styles.font}><TextCashRed>- <TextMask value={data.saldoMensal} type={'money'} /> </TextCashRed></TextTitle>
                                    )}
                                </Wellcome>
                                <CardReceitaDespesa>

                                    <View style={{ width: '90%', padding: 10, paddingTop: 0 }}>

                                        <Text style={{ color: '#000' }}>Categoria mais lucrativa</Text>

                                        <FlexRow>
                                            <Text style={{ color: '#969696' }}>{data.categoriaMaisLucrativa.ctg_nome}</Text>
                                            <Text style={styles.font}><TextCash style={{ fontSize: 14 }}><TextMask value={data.categoriaMaisLucrativa.ctg_total} type={'money'} /></TextCash></Text>
                                        </FlexRow>

                                        <Text style={{ color: '#000' }}>Maior Receita</Text>

                                        <FlexRow>
                                            <Text style={{ color: '#969696' }}>{data.maiorReceita.receita_descricao}</Text>
                                            <Text style={styles.font}><TextCash style={{ fontSize: 14 }}><TextMask value={data.maiorReceita.receita_valor} type={'money'} /></TextCash></Text>
                                        </FlexRow>
                                    </View>

                                </CardReceitaDespesa>
                                <CardReceitaDespesa>
                                    <View style={{ width: '90%', padding: 10 }}>
                                        <Text style={{ color: '#000', fontFamily: 'OpenSans_400Regular' }}>Categoria mais prejuízo</Text>
                                        <FlexRow>
                                            <Text style={{ color: '#969696', fontFamily: 'OpenSans_400Regular' }}>{data.maiorDespesa.despesa_descricao}</Text>
                                            <Text style={styles.font}><TextCashRed style={{ fontSize: 14 }}>- <TextMask value={data.maiorDespesa.despesa_valor} type={'money'} /></TextCashRed></Text>
                                        </FlexRow>
                                        <Text style={{ color: '#000', fontFamily: 'OpenSans_400Regular' }}>Maior Despesa</Text>
                                        <FlexRow>
                                            <Text style={{ color: '#969696', fontFamily: 'OpenSans_400Regular' }}>{data.maiorDespesa.despesa_descricao}</Text>
                                            <Text style={styles.font}><TextCashRed style={{ fontSize: 14 }}>- <TextMask value={data.maiorDespesa.despesa_valor} type={'money'} /></TextCashRed></Text>
                                        </FlexRow>
                                    </View>
                                </CardReceitaDespesa>
                            </>
                        ) : (
                            <TextTitleName>Adicione receitas e despesas</TextTitleName>
                        )}
                    </View>

                <View>
                    <LineChart
                        data={{
                            labels: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
                            datasets: [
                                {
                                    data: data.saldoGrafico.map((value,key) => value)
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={220}
                        withVerticalLines={false}
                        chartConfig={{
                            padding: 30,
                            backgroundColor: "#fff",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                            paddingLeft: 5,
                            borderRadius: 16
                            },
                            propsForDots: {
                                r: "5",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 0
                        }}
                    />
                </View>
                </>
                ))}
            </Container>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    font: {
        fontFamily: 'OpenSans_400Regular'
    },

});