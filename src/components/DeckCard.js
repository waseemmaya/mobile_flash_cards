import React, { Component } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

export default class DeckCard extends Component {
  render() {
    const { handleCard, deck } = this.props;

    let cardName = deck.questions.length === 1 ? "Card" : "Cards";
    return (
      <TouchableOpacity
        key={deck.title}
        onPress={() => handleCard && handleCard(deck)}
      >
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>{deck.title}</Title>
            <Paragraph style={styles.description}>
              <Paragraph style={styles.count}>
                {deck.questions.length}
              </Paragraph>
              {` `}
              {cardName}
            </Paragraph>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#2A89FF",
  },
  title: {
    color: "white",
    fontSize: 26,
    paddingBottom: 10,
  },
  description: {
    color: "white",
    fontSize: 18,
  },
  count: {
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "bold",
    color: "white",
  },
});
