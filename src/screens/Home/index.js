import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, Alert, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useForm, Controller } from "react-hook-form";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Container, TextTitle, Wellcome } from "./styles";

export default function Home({ navigation }) {
  const [hora, setHora] = useState();
  const [nome, setNome] = useState();

  async function getUser() {
    const nome = await AsyncStorage.getItem('nome');
    console.log('[nome]', nome)
    setNome(nome);
  }
  console.log('[hora]', moment().format('HH'))
  
  useEffect(() => {
    setHora(moment().format('HH'));
    getUser();
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
    </Container>
  );
}
