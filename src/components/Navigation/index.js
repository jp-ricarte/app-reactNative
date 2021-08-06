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
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Receitas" component={Receitas} />
        <Tab.Screen name="Despesas" component={Despesas} />
        <Tab.Screen name="Categorias" component={Despesas} />
        <Tab.Screen name="Configurações" component={Configurações} />
      </Tab.Navigator>
    </>
  );
};



export { HomeTabs };