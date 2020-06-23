import React, { Component } from "react";
import { View } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import NoDeckFound from "../components/NoDeckFound";

export default class DeckView extends Component {
  render() {
    const deckId = this.props.route.params.title;
    let deck = this.props.decksList.find((d) => d.title === deckId);

    if (!deck) {
      return null;
    }
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
            this.props.handleDelete(deck.title);
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
