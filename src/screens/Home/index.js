import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, Alert, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { useForm, Controller } from "react-hook-form";
import moment from 'moment';
import "moment/locale/pt-br";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../services/api";
import { TextInputMask, TextMask } from 'react-native-masked-text';

import { Container, TextTitle, Wellcome, TextCash, TextCashRed, TextTitleName, FlexRow, CardReceitaDespesa, ViewIcon } from "./styles";


export default function Home({ navigation }) {
  const [hora, setHora] = useState();
  const [nome, setNome] = useState();
  const [data, setData] = useState([]);
  const [mes, setMes] = useState();
  const [saldoMensal, setSaldoMensal] = useState();
  const [saldoResultado, setSaldoResultado] = useState();
  const [maiorReceitaNome, setMaiorReceitaNome] = useState();
  const [maiorReceitaValor, setMaiorReceitaValor] = useState();


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
    <Container style={{ fontFamily: '' }}>
      {data.map(data => (
        <>
          {data.receita && data.despesa ? (
            <>
              <Wellcome>
                {hora >= '18' && (
                  <TextTitle>Boa noite, <TextTitleName>{nome}!</TextTitleName></TextTitle>
                )}
                {hora >= '12' && hora < '18' && (
                  <TextTitle>Boa tarde, <TextTitleName>{nome}!</TextTitleName></TextTitle>
                )}
                {hora < '12' && (
                  <TextTitle>Bom dia, <TextTitleName>{nome}!</TextTitleName></TextTitle>
                )}
              </Wellcome>
              <Wellcome>
                <Text>Seu saldo nesse mês de <Text style={{ fontWeight: 'bold' }}>{mes}</Text> é:</Text>
                {data.saldoResultado == 'Lucro' ? (
                  <TextTitle><TextCash> <TextMask value={data.saldoMensal} type={'money'} /> </TextCash></TextTitle>

                ) : (
                  <TextTitle><TextCashRed>- <TextMask value={data.saldoMensal} type={'money'} /> </TextCashRed></TextTitle>
                )}
              </Wellcome>
              <CardReceitaDespesa>
                <ViewIcon style={{ backgroundColor: '#3dbd20', }}>
                  <IconFontAwesome name="dollar" size={20} color="rgba(255, 255, 255, 1)" />
                </ViewIcon>
                <View style={{ width: '88%', padding: 10 }}>
                  <Text>Maior Receita</Text>
                  <FlexRow>
                    <Text>{data.maiorReceita.receita_descricao}</Text>
                    <Text><TextCash style={{ fontSize: 14 }}><TextMask value={data.maiorReceita.receita_valor} type={'money'} /></TextCash></Text>
                  </FlexRow>
                </View>

              </CardReceitaDespesa>
              <CardReceitaDespesa>
                <ViewIcon style={{ backgroundColor: 'red' }}>
                  <IconFontAwesome name="dollar" size={20} color="rgba(255, 255, 255, 1)" />
                </ViewIcon>
                <View style={{ width: '88%', padding: 10 }}>
                  <Text>Maior Despesa</Text>
                  <FlexRow>
                    <Text>{data.maiorDespesa.despesa_descricao}</Text>
                    <Text><TextCashRed style={{ fontSize: 14 }}>- <TextMask value={data.maiorDespesa.despesa_valor} type={'money'} /></TextCashRed></Text>
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
