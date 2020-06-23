import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default class ShowResults extends Component {
  render() {
    const { correct, incorrect } = this.props.state;
    return (
      <View>
        <Text>Show Results here</Text>
        <View>
          <Text>Correct : {correct}</Text>
          <Text>In-Correct : {incorrect}</Text>
        </View>
        <Button
          mode="contained"
          onPress={() => {
            const deck = this.props.route.params;
            const { navigation } = this.props;
            navigation.navigate("DeckView", {
              ...deck,
            });
          }}
        >
          Restart Quiz
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            const { navigation } = this.props;
            navigation.navigate("Decks");
          }}
        >
          Go back to decks
        </Button>
      </View>
    );
  }
}
