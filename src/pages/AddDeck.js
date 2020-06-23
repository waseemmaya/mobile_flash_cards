import React, { Component } from "react";
import { Text, View, TextInput, Button } from "react-native";
import SnackBarNotifier from "../components/SnackBarNotifier";

export default class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckTitle: "",
      showSnack: false,
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
          onPress={async () => {
            const { deckTitle } = this.state;
            if (!deckTitle) {
              this.setState({
                showSnack: true,
              });
              return;
            }
            await this.props.handleAddDeck(deckTitle);
            this.setState({
              deckTitle: "",
            });
            const { navigation } = this.props;
            navigation.navigate("DeckView", {
              title: deckTitle,
              questions: [],
            });
          }}
          title="Submit"
          //   color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <SnackBarNotifier
          hide={() => this.setState({ showSnack: false })}
          visible={this.state.showSnack}
          message={"Add title"}
        />
      </View>
    );
  }
}
