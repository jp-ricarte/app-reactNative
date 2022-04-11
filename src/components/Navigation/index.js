import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Button } from "react-native";
import Login from "../../screens/Login";
import Home from "../../screens/Home";
import Receitas from "../../screens/Receitas";
import Despesas from "../../screens/Despesas";
import Configurações from "../../screens/Configurações";
import Icon from "react-native-vector-icons/FontAwesome5";
import Categorias from "../../screens/Categorias";
import Toast from 'react-native-toast-message';
import {} from 'react-native-svg'

const Tab = createBottomTabNavigator();

const HomeTabs = ({ navigation }) => {
  return (
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
            if (focused) {
              return <Icon name={iconName} size={29} color={color} />;
            }
            else {
              return <Icon name={iconName} size={25} color={color} />;
            }
          },
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height: 60
          }
        })}
      >
        <Tab.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Tab.Screen options={{ headerShown: false }} name="Receitas" component={Receitas} />
        <Tab.Screen options={{ headerShown: false }} name="Despesas" component={Despesas} />
        <Tab.Screen name="Categorias" component={Categorias} />
        <Tab.Screen name="Configurações" component={Configurações} />
      </Tab.Navigator>
    </>
  );
};



export { HomeTabs };