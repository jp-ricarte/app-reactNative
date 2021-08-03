import React, { useState } from "react";

import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PersistGate } from "redux-persist/integration/react";
import Ionicons from 'react-native-vector-icons/Ionicons';


import Login from "./src/screens/Login/index";
import Home from "./src/screens/Home/index";
import Itens from "./src/screens/Itens/index";
import { ScrollView } from "react-native";

import { HomeStackNavigator } from "./src/components/Navigation/index";
import { ItensStackNavigator } from "./src/components/Navigation/index";
import { store, persistor } from "./src/store";

import AsyncStorage from '@react-native-async-storage/async-storage';

import NetInfo from "@react-native-community/netinfo";

const unsubscribe = NetInfo.addEventListener((state) => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
});

// Unsubscribe
unsubscribe();
const Drawer = createDrawerNavigator();
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
    console.log(signIn); 
  }

  getStore();

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
                      iconName = focused
                        ? 'ios-information-circle'
                        : 'ios-information-circle-outline';
                    } else if (route.name === 'Settings') {
                      iconName = focused ? 'ios-list-box' : 'ios-list';
                    }
        
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                })}
                screenOptions={{
                  activeTintColor: 'tomato',
                  inactiveTintColor: 'gray',
                }}
                >
                  <Tab.Screen name="Home" component={HomeStackNavigator} />
                  <Tab.Screen name="Itens" component={ItensStackNavigator} />
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
