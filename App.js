import React, { useState, useEffect } from "react";

import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PersistGate } from "redux-persist/integration/react";

import Login from "./src/screens/Login/index";
import Home from "./src/screens/Home/index";
import Receitas from "./src/screens/Receitas/index";
import Despesas from "./src/screens/Despesas/index";
import { ScrollView } from "react-native";

import { HomeStackNavigator } from "./src/components/Navigation/index";
import { store, persistor } from "./src/store";
import Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NetInfo from "@react-native-community/netinfo";

const unsubscribe = NetInfo.addEventListener((state) => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
});

// Unsubscribe
unsubscribe();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptionStyle = {
  headerTitleStyle: { alignSelf: "center" },
  headerStyle: {
    backgroundColor: "#01a862",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

export default function App() {
  const [signIn, setSignIn] = useState(false);

  async function getStore() {
    const login = await AsyncStorage.getItem('@storage_Key');
    setSignIn(login);
    console.log('[signin]', signIn);
  }

  useEffect(() => {
    getStore();
  });


  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            {signIn ? (
              <>
                <Tab.Navigator
                  screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;

                      if (route.name === 'Home') {
                        iconName = 'home'
                      } else if (route.name === 'Receitas') {
                        iconName = 'money-bill-alt';
                      } else if (route.name === 'Despesas') {
                        iconName = 'sad-cry';
                      } else if (route.name === 'Categorias') {
                        iconName = 'bars';
                      } else if (route.name === 'Configurações') {
                        iconName = 'cog';
                      }



                      return <Icon name={iconName} size={size} color={color} />;
                    },
                    tabBarInactiveTintColor: 'gray',
                  })}
                >
                  <Tab.Screen name="Home" component={Home} />
                  <Tab.Screen name="Receitas" component={Receitas} />
                  <Tab.Screen name="Despesas" component={Despesas} />
                  <Tab.Screen name="Categorias" component={Despesas} />
                  <Tab.Screen name="Configurações" component={Despesas} />
                </Tab.Navigator>
              </>
            ) : (
              <Stack.Navigator>
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="Login"
                  component={Login}
                />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
}
