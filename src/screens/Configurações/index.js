import React from "react";
import { Text, View, TextInput, Button, Alert, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Container } from "../../../global";
import Icon from "react-native-vector-icons/AntDesign";
import { UL, LI } from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react/cjs/react.development";
import { persistStore } from "redux-persist";
import { store } from "../../store";
import { useDispatch } from "react-redux";
import { sair } from "../../store/modules/user/actions";

export default function Configurações({ navigation }) {
    const dispatch = useDispatch();
    const { user } = store.getState().user;

    async function logout() {
        try {
            navigation.navigate('Login')
            await AsyncStorage.removeItem('@storage_Key');
        }
        catch(exception) { 
            
        }
      }
 
  return (
      <UL>
          <LI onPress={logout}> 
            <Icon name="logout" size={20} color="rgba(228, 14, 14, 1)" /> Sair</LI>
      </UL>
  );
}
