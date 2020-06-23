import React, { Component } from "react";
import { View, TextInput, Button } from "react-native";

export default class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
    };
  }

  render() {
    const { question, answer } = this.state;
    const deck = this.props.route.params;
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Question..."
          onChangeText={(e) => this.setState({ question: e })}
          value={question}
        />
        <TextInput
          placeholder="Answer..."
          onChangeText={(e) => this.setState({ answer: e })}
          value={answer}
        />
        <Button
          onPress={() => {
            this.props.handleAddCard(question, answer, deck.title);
            const { navigation } = this.props;
            navigation.navigate("DeckView", {
              ...deck,
            });
          }}
          title="Submit"
          //   color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}
