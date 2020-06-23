import React, { Component } from "react";
import {
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Text,
  SafeAreaView,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import NoDeckFound from "../components/NoDeckFound";

export default class Decks extends Component {
  handleCard = (deck) => {
    const { navigation } = this.props;

    navigation.navigate("DeckView", {
      ...deck,
    });
  };

  render() {
    const { decksList } = this.props;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.props.refreshing}
              onRefresh={this.handleRefresh}
            />
          }
        >
          {!decksList || decksList.length === 0 ? (
            <NoDeckFound />
          ) : (
            decksList.map((deck) => (
              <TouchableOpacity
                key={deck.title}
                onPress={() => this.handleCard(deck)}
              >
                <Card style={{ margin: 2 }}>
                  <Card.Content>
                    <Title>{deck.title}</Title>
                    <Paragraph>{deck.questions.length} Cards</Paragraph>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
