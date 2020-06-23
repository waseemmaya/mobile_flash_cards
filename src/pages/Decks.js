import React, { Component } from "react";
import {
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Text,
  SafeAreaView,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { getDecks } from "../services/storageHelper";
import NoDeckFound from "../components/NoDeckFound";

export default class Decks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decksList: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getDecksList();
  }

  getDecksList = async () => {
    try {
      let decksRes = await getDecks();
      this.setState({
        decksList: decksRes,
      });
    } catch (error) {}
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

  handleCard = (deck) => {
    const { navigation } = this.props;
    navigation.navigate("DeckView", {
      ...deck,
    });
  };

  render() {
    const { decksList } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
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
