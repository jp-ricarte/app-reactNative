import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Button } from "react-native";
import Itens from "../../screens/Itens/";
import Home from "../../screens/Home";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerTitleStyle: { marginLeft: 10 },
  headerStyle: {
    backgroundColor: "#01a862",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
  headerLeftContainerStyle: {
    marginLeft: 10,
    paddingLeft: 10,
  },
  headerRightContainerStyle: {
    marginRight: 10,
    paddingRight: 10,
  },
};

const HomeStackNavigator = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen
          options={{
            headerLeft: () => (
              <Button
                onPress={() => navigation.openDrawer()}
                title="&#9776;"
                color="#01a862"
              />
            ),
          }}
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    </>
  );
};

const ItensStackNavigator = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen
          options={{
            headerLeft: () => (
              <Button
                onPress={() => navigation.openDrawer()}
                title="&#9776;"
                color="#01a862"
              />
            ),
          }}
          name="Itens"
          component={Itens}
        />
      </Stack.Navigator>
    </>
  );
};

export { HomeStackNavigator, ItensStackNavigator };
