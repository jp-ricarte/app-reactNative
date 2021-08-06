import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PersistGate } from "redux-persist/integration/react";

import { HomeTabs } from './src/components/Navigation/index'

import Login from "./src/screens/Login/index";
import Home from "./src/screens/Home/index";
import Receitas from "./src/screens/Receitas/index";
import Despesas from "./src/screens/Despesas/index";  
import Configurações from "./src/screens/Configurações/index";
import { ScrollView } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store, persistor } from "./src/store";

import NetInfo from "@react-native-community/netinfo";

const unsubscribe = NetInfo.addEventListener((state) => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
});

// Unsubscribe
unsubscribe();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App({navigation}) {
  const { user } = store.getState().user;
  console.log('[userApp]', user);



  return (
    <>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="Login"
                  component={Login}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="HomeTabs"
                  component={HomeTabs}
                />
              </Stack.Navigator>
            
          </NavigationContainer>
          </PersistGate>
          </Provider>
    </>
  );
}
