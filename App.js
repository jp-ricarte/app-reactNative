import React, { useState } from "react";

import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { PersistGate } from "redux-persist/integration/react";

import Login from "./src/screens/Login/index";
import Home from "./src/screens/Home/index";
import Itens from "./src/screens/Itens/index";
import { ScrollView } from "react-native";

import { HomeStackNavigator } from "./src/components/Navigation/index";
import { ItensStackNavigator } from "./src/components/Navigation/index";
import { store, persistor } from "./src/store";

import NetInfo from "@react-native-community/netinfo";

const unsubscribe = NetInfo.addEventListener((state) => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
});

// Unsubscribe
unsubscribe();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer> 
            {signIn ? (
              <>
                <Drawer.Navigator
                  drawerContentOptions={{
                    activeTintColor: "green", 
                    activeBackgroundColor: "#04d479",
                    inactiveTintColor: "green",
                    inactiveBackgroundColor: "white",
                    labelStyle: {
                      fontSize: 18,
                    },
                  }}
                >
                  <Drawer.Screen name="Home" component={HomeStackNavigator} />
                  <Drawer.Screen name="Itens" component={ItensStackNavigator} />
                </Drawer.Navigator>
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
