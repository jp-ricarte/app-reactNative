import React from "react";
import { useDispatch } from "react-redux";

import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PersistGate } from "redux-persist/integration/react";

import { HomeTabs } from './src/components/Navigation/index'

import Login from "./src/screens/Login/index";

import Toast from 'react-native-toast-message';

import Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store, persistor } from "./src/store";
import api from "./src/services/api";
import NetInfo from "@react-native-community/netinfo";

const unsubscribe = NetInfo.addEventListener((state) => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
});

unsubscribe();
const Stack = createStackNavigator();

export default function App({navigation}) {
  // const [user, setUser] = useState();

  
  // async function login(data) {
  //   try{
  //     console.log('datauser', data)
  //     await api.post('/login', data).then((response) => {
  //       if (response.data.loggedIn) {
  //         const jsonValue = JSON.stringify(data);
  //         AsyncStorage.setItem('@storage_Key', jsonValue);
  //         navigation.navigate('HomeTabs');
  //       } else {
  //         alert('E-mail ou senha inválidos!');
  //       }
        
  //     });
      
  //   }catch(err) {
  //     console.log(err.response.data)
  //   }
  // }
  
  // async function getUser() {
  //   const log = await AsyncStorage.getItem('@storage_Key');
  //   setUser(log);
  //   console.log(user);
  //   login(user);
  // }
  // getUser();
  
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
