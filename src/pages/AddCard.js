import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

export default class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
    };
  }

  handleChange = (value, label) => {
    this.setState({
      [label]: value,
    });
  };

  render() {
    const { question, answer } = this.state;
    const deck = this.props.route.params;
    return (
      <View style={{ flex: 1 }}>
        {/* <TextInput
          placeholder="Question..."
        /> */}
        <TextInput
          onChangeText={(e) => this.handleChange(e, "question")}
          label="Question"
          style={styles.input}
          value={question}
        />

        <TextInput
          onChangeText={(e) => this.handleChange(e, "answer")}
          label="Answer"
          style={styles.input}
          value={answer}
        />

        {/* <TextInput
          placeholder="Answer..."
          value={answer}
        /> */}
        <Button
          style={styles.addBtn}
          color="#2A89FF"
          onPress={() => {
            this.props.handleAddCard(question, answer, deck.title);
            const { navigation } = this.props;
            navigation.navigate("DeckView", {
              ...deck,
            });
          }}
          disabled={!this.state.question || !this.state.answer}
          mode="contained"
        >
          Submit
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addBtn: {
    margin: 10,
    width: "50%",
    alignSelf: "center",
  },
  input: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
});
