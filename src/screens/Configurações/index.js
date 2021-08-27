import React from "react";
import { Text, View, TextInput, Button, Alert, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Container } from "../../../global";
import Icon from "react-native-vector-icons/AntDesign";
import { UL, LI } from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react/cjs/react.development";

export default function Configurações({ navigation }) {

    async function logout() {
        try {
            await AsyncStorage.removeItem('@storage_Key');
            navigation.navigate('Login')
        }
        catch(exception) { 
            
        }
      }

  return (
      <UL>
          <LI onPress={logout}><Icon name="logout" size={20} color="rgba(228, 14, 14, 1)" /> Sair</LI>
      </UL>
  );
}
