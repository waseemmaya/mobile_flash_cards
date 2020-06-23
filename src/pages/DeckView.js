import React, { Component } from "react";
import { Text, View } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

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
      </View>
    );
  }
}
