import React, { Component } from "react";
import { View } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { deleteDeck } from "../services/storageHelper";

export default class DeckView extends Component {
  render() {
    const deck = this.props.route.params;
    return (
      <View style={{ flex: 1 }}>
        <Card style={{ marginTop: 50 }}>
          <Card.Content
            style={{
              alignItems: "center",
            }}
          >
            <Title>{deck.title}</Title>
            <Paragraph>{deck.questions.length} Cards</Paragraph>
          </Card.Content>
        </Card>
        <Button
          mode="outlined"
          onPress={() => {
            const { navigation } = this.props;
            navigation.navigate("AddCard", {
              ...deck,
            });
          }}
        >
          Add Card
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            const { navigation } = this.props;
            navigation.navigate("Quiz", {
              ...deck,
            });
          }}
        >
          Start Quiz
        </Button>
        <Button
          color="red"
          mode="contained"
          onPress={() => {
            deleteDeck(deck.title);
            const { navigation } = this.props;
            navigation.navigate("Decks");
          }}
        >
          Delete Deck
        </Button>
      </View>
    );
  }
}
