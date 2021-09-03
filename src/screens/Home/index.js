import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, Alert, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { useForm, Controller } from "react-hook-form";
import moment from 'moment';
import "moment/locale/pt-br";
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../services/api";
import { TextInputMask, TextMask } from 'react-native-masked-text';
import { useFonts, OpenSans_600SemiBold, OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import { Container, TextTitle, Wellcome, TextCash, TextCashRed, TextTitleName, FlexRow, CardReceitaDespesa, ViewIcon } from "./styles";


export default function Home({ navigation }) {
  const [hora, setHora] = useState();
  const [nome, setNome] = useState();
  const [data, setData] = useState([]);
  const [mes, setMes] = useState();

  let [fontsLoaded] = useFonts({
    OpenSans_600SemiBold,
    OpenSans_400Regular
  });

  async function getUser() {
    const nome = await AsyncStorage.getItem('nome');
    setNome(nome);
  }

  async function getDashboard() {
    try {
      const res = await api.get('/dashboard');
      setData(res.data);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setHora(moment().format('HH'));
    setMes(moment().format('MMMM'))
    getUser();
    getDashboard();
  }, [data]);

  return (
    <Container>
      {data.map(data => (
        <>
          {data.receita && data.despesa ? (
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
              <Wellcome>
                <Text style={styles.font}>Seu saldo nesse mês de <Text style={{ fontWeight: 'bold' }}>{mes}</Text> é:</Text>
                {data.saldoResultado == 'Lucro' ? (
                  <TextTitle style={styles.font}><TextCash> <TextMask value={data.saldoMensal} type={'money'} /> </TextCash></TextTitle>

                ) : (
                  <TextTitle style={styles.font}><TextCashRed>- <TextMask value={data.saldoMensal} type={'money'} /> </TextCashRed></TextTitle>
                )}
              </Wellcome>
              <CardReceitaDespesa>
                <ViewIcon style={{ backgroundColor: '#3dbd20', }}>
                  <IconFontAwesome name="dollar" size={20} color="rgba(255, 255, 255, 1)" />
                </ViewIcon>
                <View style={{ width: '88%', padding: 10 }}>
                  <Text style={{ color: '#969696' }}>Maior Receita</Text>
                  <FlexRow>
                    <Text style={styles.font}>{data.maiorReceita.receita_descricao}</Text>
                    <Text style={styles.font}><TextCash style={{ fontSize: 14 }}><TextMask value={data.maiorReceita.receita_valor} type={'money'} /></TextCash></Text>
                  </FlexRow>
                </View>

              </CardReceitaDespesa>
              <CardReceitaDespesa>
                <ViewIcon style={{ backgroundColor: 'red' }}>
                  <IconFontAwesome name="dollar" size={20} color="rgba(255, 255, 255, 1)" />
                </ViewIcon>
                <View style={{ width: '88%', padding: 10 }}>
                  <Text style={{ color: '#969696', fontFamily: 'OpenSans_400Regular' }}>Maior Despesa</Text>
                  <FlexRow>
                    <Text style={styles.font}>{data.maiorDespesa.despesa_descricao}</Text>
                    <Text style={styles.font}><TextCashRed style={{ fontSize: 14 }}>- <TextMask value={data.maiorDespesa.despesa_valor} type={'money'} /></TextCashRed></Text>
                  </FlexRow>
                </View>
              </CardReceitaDespesa>
            </>
          ) : (
            <TextTitleName>Adicione receitas e despesas</TextTitleName>
          )}
        </>

      ))}
    </Container>
  );
}

const styles = StyleSheet.create({
  font: {
    fontFamily: 'OpenSans_400Regular'
  },
  
});