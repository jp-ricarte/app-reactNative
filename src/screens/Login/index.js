import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, Alert, Image, ActivityIndicator, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useFocusEffect } from '@react-navigation/native';
import IconCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { useForm, Controller } from "react-hook-form";
import * as Google from "expo-google-app-auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  TextInputStyled,
  Email,
  Senha,
  ButtonLogin,
  ViewButton,
  TextLogin,
  Titulo,
  ViewButtonGoogle
} from "./styles";

import { Container } from '../../../global';
import api from "../../services/api";

export default function Login({ routes, navigation }) {
  const { control, handleSubmit, errors } = useForm();
  const [hide, sethide] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingStorage, setLoadingStorage] = useState(true);
  const [emailData, setemailData] = useState();
  const [senhaData, setSenhaData] = useState();
  const [nome, setNome] = useState();


  async function googleLogin() {
    try {
      const { type, user } = await Google.logInAsync({
        iosClientId: `<YOUR_IOS_CLIENT_ID>`,
        androidClientId: `356000393313-vp3df828bj11s3ej6qgf4qdm1dgvc7o8.apps.googleusercontent.com`,
      });

      if (type === "success") {
        // Then you can use the Google REST API
        console.log("LoginScreen.js 17 | success, navigating to profile", user);
      }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
    }
  };

  async function getUser() {
    const email = await AsyncStorage.getItem('email');
    const senha = await AsyncStorage.getItem('senha');
    const nome = await AsyncStorage.getItem('nome');
    const id = await AsyncStorage.getItem('id');
    setNome(nome);
    console.log('[localstorage]', email, senha, nome, id);
    if (email && senha) {
      loginauto(email, senha);
    } else {
      setLoadingStorage(false);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getUser();
    }, [])
);


  async function loginauto(email, senha) {
    try {
      if (email) {
        await api.post('/login', {
          "user_email": email,
          "user_senha": senha
        });
        navigation.navigate('HomeTabs');
      }
    } catch(err) {
      console.log(err);
    }
  }

  async function login(data) {
    setLoading(true);
    try {
      await api.post('/login', data).then((response) => {
        if (response.data.loggedIn) {
          let idString = response.data.data.user_id.toString();

          navigation.navigate('HomeTabs');
          
          AsyncStorage.setItem('email', data.user_email);
          AsyncStorage.setItem('senha', data.user_senha);
          AsyncStorage.setItem('id', idString);
          AsyncStorage.setItem('nome', response.data.data.user_nome);
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
<>
    {loadingStorage ? (
      <Container></Container>
    ) :(
    <Container>
      <Image source={require('../../images/ricarte.jpeg')} style={{ width: '75%', height: 130, resizeMode: 'stretch', marginBottom: 20 }} />
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Email style={{
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            
            elevation: 4,
        }}>
            <Icon name="mail-outline" size={20} color="rgba(0, 0, 0, 1)" />
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
          <Senha style={styles.shadow}>
            <Icon name="lock" size={20} color="rgba(0, 0, 0, 1)" />
            <TextInputStyled onBlur={onBlur} placeholder="senha" onChangeText={(value) => onChange(value)} value={value} secureTextEntry={hide ? true : false} />
            <Icon onPress={hideHidePassword} name={hide ? "visibility-off" : "visibility"} size={24} color="rgba(0, 0, 0, 1)" />
          </Senha>
        )}
        name="user_senha"
        rules={{ required: true }}
        defaultValue=""
      />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 29 }} size="large" color="#0477C4" />
      ) : (
        <ViewButton style={styles.shadow}>
          <ButtonLogin title="Submit" onPress={handleSubmit(login)}>
            <IconCommunity name="login" size={20} color="rgba(0, 0, 0, 1)" />
            <TextLogin style={{color: '#000'}}> Entrar</TextLogin>
          </ButtonLogin>
        </ViewButton>
      )}
      {/* <Text>ou</Text>
        <ViewButtonGoogle style={styles.shadow}>
          <ButtonLogin title="Submit" onPress={googleLogin}>
            <TextLogin style={{color: '#fff'}}> <IconFontAwesome name="google" size={20} color="rgba(255, 255, 255, 1)" /> Entrar com o Google</TextLogin>
          </ButtonLogin>
        </ViewButtonGoogle> */}
    </Container>

    )}
    </>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    
    elevation: 4,
  },
  
});