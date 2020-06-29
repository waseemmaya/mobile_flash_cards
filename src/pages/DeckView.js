import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import DeckCard from "../components/DeckCard";

export default class DeckView extends Component {
  render() {
    const deckId = this.props.route.params.title;
    let deck = this.props.decksList.find((d) => d.title === deckId);

    if (!deck) {
      return null;
    }
    return (
      <View style={styles.main}>
        <View style={styles.deckView}></View>
        <DeckCard deck={deck} />

        <View style={styles.btnView}>
          <Button
            style={styles.addBtn}
            color="#2A89FF"
            onPress={() => {
              const { navigation } = this.props;
              navigation.navigate("AddCard", {
                ...deck,
              });
            }}
            mode="contained"
          >
            Add Card
          </Button>
          {/* <Text>OR</Text> */}
          <Button
            style={styles.startBtn}
            mode="contained"
            color="#2A89FF"
            onPress={() => {
              const { navigation } = this.props;
              navigation.navigate("Quiz", {
                ...deck,
              });
            }}
          >
            Start Quiz
          </Button>
          {/* <Button
            style={styles.deleteBtn}
            color="red"
            mode="contained"
            onPress={() => {
              this.props.handleDelete(deck.title);
              const { navigation } = this.props;
              navigation.navigate("Decks");
            }}
          >
            Delete Deck
          </Button> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  btnView: {
    marginTop: 30,
  },
  deckView: {
    marginTop: 10,
  },
  addBtn: {
    margin: 10,
    width: "50%",
    alignSelf: "center",
  },

  startBtn: {
    margin: 10,
    width: "50%",
    alignSelf: "center",
  },

  deleteBtn: {
    margin: 10,
    width: "50%",
    alignSelf: "center",
  },
});
