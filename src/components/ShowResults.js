import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Paragraph, Button } from "react-native-paper";
import {
  clearLocalNotification,
  initNotification,
} from "../services/notifications";
import { getFullDate } from "../services/dateHelper";
import { setLocalStorage } from "../services/storageHelper";

let lastAttemptedDate = "lastAttemptedDate";

export default class ShowResults extends Component {
  async componentDidMount() {
    try {
      await clearLocalNotification().then(initNotification);
      await setLocalStorage(lastAttemptedDate, getFullDate(new Date()));
    } catch (error) {
      console.log("error: ", error);
    }
  }
  render() {
    const { correct, incorrect, deck } = this.props.state;

    return (
      <View style={{ flex: 1 }}>
        <Card style={styles.card}>
          <Card.Content>
            <Paragraph style={styles.description}>Result</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Paragraph style={styles.description}>
              Total : {correct + incorrect}
            </Paragraph>
            <Paragraph style={styles.description}>
              Correct : {correct}
            </Paragraph>
            <Paragraph style={styles.description}>
              In-Correct : {incorrect}
            </Paragraph>
            <Paragraph style={styles.description}>
              Percentage : {(correct / (incorrect + correct)) * 100}%
            </Paragraph>
          </Card.Content>
        </Card>
        <View style={styles.btnView}>
          <Button
            style={styles.btn}
            color="#2A89FF"
            mode="contained"
            onPress={() => {
              this.props.restartQuiz();
            }}
          >
            Restart Quiz
          </Button>
          <Button
            style={styles.btn}
            color="#2A89FF"
            onPress={() => {
              const { navigation, deck } = this.props;

              navigation.navigate("DeckView", {
                ...deck,
              });
            }}
            mode="contained"
          >
            Go back to Deck
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#2A89FF",
  },
  description: {
    fontSize: 25,
    textAlign: "center",
    lineHeight: 30,
    fontWeight: "bold",
    color: "white",
  },
  btn: {
    margin: 10,
    width: "50%",
    alignSelf: "center",
  },
  btnView: {
    marginTop: 20,
  },
});
