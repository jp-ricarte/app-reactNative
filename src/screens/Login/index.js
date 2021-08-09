import React from "react";
import { Text, View, TextInput, Button, Alert, Image, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  TextInputStyled,
  Email,
  Senha,
  ButtonLogin,
  ViewButton,
  TextLogin,
  Titulo,
} from "./styles";

import { Container } from '../../../global';

import { useState, useEffect } from "react/cjs/react.development";
import api from "../../services/api";

export default function Login({ navigation }) {
  const { control, handleSubmit, errors } = useForm();
  const [hide, sethide] = useState(true);
  const [loading, setLoading] = useState(false);
  const [emailData, setemailData] = useState();
  const [senhaData, setSenhaData] = useState();

  async function getUser() {
    const email = await AsyncStorage.getItem('email')
    const senha = await AsyncStorage.getItem('senha')
    console.log(email, senha)
    loginauto(email, senha);
  }
  
  useEffect(() => {
    getUser();
  }, []);
  async function loginauto(email, senha) {
    try {
      
      await api.post('/login', {
        "user_email": email,
        "user_senha": senha
      });
      navigation.navigate('HomeTabs');
    } catch(err) {
      console.log(err);
    }
  }

  async function login(data) {
    setLoading(true);
    try {
      await api.post('/login', data).then((response) => {
        if (response.data.loggedIn) {
          console.log('userl', data);
          navigation.navigate('HomeTabs');
          AsyncStorage.setItem('email', data.user_email)
          AsyncStorage.setItem('senha', data.user_senha)
        } else {
          alert('E-mail ou senha inválidos!');
        }
      });
    } catch (err) {
      console.log(err.response.data);
    }
    setLoading(false);
  }

  function hideHidePassword() {
    sethide(!hide);
  }

  return (
    <Container>
      <Image source={require('../../images/ricarte.jpeg')} style={{ width: '75%', height: 130, resizeMode: 'stretch', marginBottom: 20 }} />
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Email>
            <Icon name="mail-outline" size={20} color="rgba(255, 255, 255, 0.6)" />
            <TextInputStyled onBlur={onBlur} placeholder="E-mail" onChangeText={(value) => onChange(value)} value={value} />
          </Email>
        )}
        name="user_email"
        rules={{ required: true }}
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Senha>
            <Icon name="lock" size={20} color="rgba(255, 255, 255, 0.6)" />
            <TextInputStyled onBlur={onBlur} placeholder="senha" onChangeText={(value) => onChange(value)} value={value} secureTextEntry={hide ? true : false} />
            <Icon onPress={hideHidePassword} name={hide ? "visibility-off" : "visibility"} size={24} color="rgba(255, 255, 255, 0.9)" />
          </Senha>
        )}
        name="user_senha"
        rules={{ required: true }}
        defaultValue=""
      />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 29 }} size="large" color="#0477C4" />
      ) : (
        <ViewButton>
          <ButtonLogin title="Submit" onPress={handleSubmit(login)}>
            <TextLogin>Entrar</TextLogin>
          </ButtonLogin>
        </ViewButton>
      )}
    </Container>
  );
}
