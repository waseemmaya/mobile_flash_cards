import React, { Component } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { saveDeckTitle } from "../services/storageHelper";

export default class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckTitle: "",
    };
  }

  render() {
    const { deckTitle } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Text> Add Deck </Text>
        <Text> What is the title of your new Deck? </Text>
        <TextInput
          placeholder="Title of Deck..."
          onChangeText={(e) => this.setState({ deckTitle: e })}
          value={deckTitle}
        />
        <Button
          onPress={() => saveDeckTitle(deckTitle)}
          title="Submit"
          //   color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}
