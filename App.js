import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Decks from "./src/pages/Decks";
import AddDeck from "./src/pages/AddDeck";
import DeckView from "./src/pages/DeckView";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow",
  },
};

export default class App extends Component {
  render() {
    return (
      // <PaperProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Decks" component={DeckStacks} />
            <Tab.Screen name="AddDeck" component={AddStacks} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
}

function DeckStacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Decks" component={Decks} />
      <Stack.Screen name="DeckView" component={DeckView} />
    </Stack.Navigator>
  );
}

function AddStacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AddDeck" component={AddDeck} />
    </Stack.Navigator>
  );
}
