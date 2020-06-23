import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { getDecks } from "../services/storageHelper";
import NoDeckFound from "../components/NoDeckFound";

export default class Decks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decksList: null,
    };
  }
  handleCard = (deck) => {
    const { navigation } = this.props;
    navigation.navigate("DeckView", {
      ...deck,
    });
  };
  render() {
    const { decksList } = this.state;
    if (!decksList) {
      return <NoDeckFound />;
    }
    return (
      <View style={{ flex: 1 }}>
        {decksList.map((deck) => (
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
        ))}
      </View>
    );
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
    } catch (error) {
      console.log("error: ", error);
    }
  };
}
