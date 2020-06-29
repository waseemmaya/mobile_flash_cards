import React, { Component } from "react";
import { ScrollView, RefreshControl, SafeAreaView } from "react-native";
import NoDeckFound from "../components/NoDeckFound";
import DeckCard from "../components/DeckCard";

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
              <DeckCard
                key={deck.title}
                deck={deck}
                handleCard={this.handleCard}
              />
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
