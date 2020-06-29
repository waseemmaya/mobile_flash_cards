import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import Decks from "./src/pages/Decks";
import AddDeck from "./src/pages/AddDeck";
import DeckView from "./src/pages/DeckView";
import AddCard from "./src/pages/AddCard";
import Quiz from "./src/pages/Quiz";
import {
  getDecks,
  deleteDeck,
  addCardToDeck,
  saveDeckTitle,
} from "./src/services/storageHelper";
import { initNotification } from "./src/services/notifications";

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
  state = {
    decksList: null,
    refreshing: false,
  };

  handleDelete = async (title) => {
    await deleteDeck(title);
    this.getDecksList();
  };

  handleAddCard = async (question, answer, title) => {
    await addCardToDeck(question, answer, title);
    this.getDecksList();
  };

  handleAddDeck = async (deckTitle) => {
    await saveDeckTitle(deckTitle);
    this.getDecksList();
  };

  handleRefresh = async () => {
    this.setState({
      refreshing: true,
    });
    await this.getDecksList();
    this.setState({
      refreshing: false,
    });
  };

  componentDidMount() {
    this.getDecksList();
    initNotification();
  }

  getDecksList = async () => {
    try {
      let decksList = await getDecks();
      this.setState({
        decksList,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  render() {
    const { decksList, refreshing } = this.state;
    let customProps = {
      decksList,
      refreshing,
      handleRefresh: this.handleRefresh,
      handleDelete: this.handleDelete,
      handleAddCard: this.handleAddCard,
      handleAddDeck: this.handleAddDeck,
    };
    return (
      // <PaperProvider theme={theme}>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "AddDeck") {
                  iconName = focused ? "ios-add" : "ios-add";
                } else if (route.name === "Decks") {
                  iconName = focused ? "ios-list-box" : "ios-list";
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen scre={"hello"} name="Decks">
              {() => <DeckStacks {...customProps} />}
            </Tab.Screen>
            <Tab.Screen name="AddDeck" {...customProps}>
              {() => <AddStacks {...customProps} />}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
}

function DeckStacks(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Decks">
        {(params) => <Decks {...props} {...params} />}
      </Stack.Screen>
      <Stack.Screen name="DeckView">
        {(params) => <DeckView {...props} {...params} />}
      </Stack.Screen>
      <Stack.Screen name="AddCard">
        {(params) => <AddCard {...props} {...params} />}
      </Stack.Screen>
      <Stack.Screen name="Quiz" component={Quiz} />
    </Stack.Navigator>
  );
}

function AddStacks(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AddDeck">
        {(params) => <AddDeck {...props} {...params} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
