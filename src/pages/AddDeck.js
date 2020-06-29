import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import SnackBarNotifier from "../components/SnackBarNotifier";
import { Card, Title, Paragraph, TextInput, Button } from "react-native-paper";

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
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Add Deck</Title>

            <Paragraph style={styles.description}>
              What is the title of your new Deck?
            </Paragraph>
          </Card.Content>
        </Card>
        <View>
          <TextInput
            onChangeText={(e) => this.setState({ deckTitle: e })}
            label="Title of Deck"
            style={styles.input}
            value={deckTitle}
          />
        </View>

        <Button
          style={styles.addBtn}
          color="#2A89FF"
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
          disabled={!this.state.deckTitle}
          mode="contained"
        >
          Submit
        </Button>
        <SnackBarNotifier
          hide={() => this.setState({ showSnack: false })}
          visible={this.state.showSnack}
          message={"Title Required"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 26,
    paddingBottom: 10,
  },
  card: {
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#2A89FF",
  },
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
  description: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    lineHeight: 30,
    fontWeight: "bold",
    color: "white",
  },
});
