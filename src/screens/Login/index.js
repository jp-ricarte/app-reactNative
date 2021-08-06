import React from "react";
import { Text, View, TextInput, Button, Alert, Image } from "react-native";
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

import { useState } from "react/cjs/react.development";
import api from "../../services/api";

export default function Login({ navigation }) {
  const { control, handleSubmit, errors } = useForm();
  const [hide, sethide] = useState(true);

  async function login(data) {
      await api.post('/login', data).then((response) => {
        if (response.data.loggedIn) {
          navigation.navigate('HomeTabs');
          const jsonValue = JSON.stringify(data);
          AsyncStorage.setItem('@storage_Key', jsonValue);
        } else {
          alert('E-mail ou senha inválidos!');      
        }
      });
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
            <Icon onPress={hideHidePassword} name={hide ? "visibility-off" : "visibility"} size={20} color="rgba(255, 255, 255, 0.9)" />
          </Senha>
        )}
        name="user_senha"
        rules={{ required: true }}
        defaultValue=""
      />
      <ViewButton>
        <ButtonLogin title="Submit" onPress={handleSubmit(login)}>
          <TextLogin>Entrar</TextLogin>
        </ButtonLogin>
      </ViewButton>
    </Container>
  );
}
