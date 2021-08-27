import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, Alert, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useForm, Controller } from "react-hook-form";
import moment from 'moment';
import "moment/locale/pt-br";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../services/api";
import { TextInputMask, TextMask } from 'react-native-masked-text';

import { Container, TextTitle, Wellcome, TextCash, TextCashRed } from "./styles";

export default function Home({ navigation }) {
  const [hora, setHora] = useState();
  const [nome, setNome] = useState();
  const [data, setData] = useState();
  const [mes, setMes] = useState();
  const [saldoMensal, setSaldoMensal] = useState();
  const [saldoResultado, setSaldoResultado] = useState();


  async function getUser() {
    const nome = await AsyncStorage.getItem('nome');
    console.log('[nome]', nome)
    setNome(nome);
  }
  
  async function getDashboard() {
    try {
        const res = await api.get('/dashboard');
        setData(res.data);
        setSaldoMensal(res.data.saldoMensal);
        setSaldoResultado(res.data.saldoResultado);
    } catch (err) {
        console.log(err);
    }
}

  useEffect(() => {
    setHora(moment().format('HH'));
    setMes(moment().format('MMMM'))
    getUser();
    getDashboard();
  }, []);

  return (
    <Container>
      <Wellcome>
        {hora >= '18' && (
          <TextTitle>Boa Noite, {nome}!</TextTitle>
        )}
        {hora >= '12' && hora < '18' && (
          <TextTitle>Boa Tarde, {nome}!</TextTitle>
        )}
        {hora < '12' && (
          <TextTitle>Bom dia, {nome}!</TextTitle>
        )}
      </Wellcome>
      <Wellcome>
        <Text>Seu saldo nesse mês de {mes} é:</Text>
        {saldoResultado == 'Lucro' ? (
          <TextTitle><TextCash> <TextMask value={saldoMensal} type={'money'} /> </TextCash></TextTitle>
          
          ) : (
            <TextTitle><TextCashRed>- <TextMask value={saldoMensal} type={'money'} /> </TextCashRed></TextTitle>
        )}
      </Wellcome>
    </Container>
  );
}
