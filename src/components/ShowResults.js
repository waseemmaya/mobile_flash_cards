import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";

export default class ShowResults extends Component {
  render() {
    const { correct, incorrect } = this.props.state;

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
              const { navigation } = this.props;
              navigation.navigate("Decks");
            }}
            mode="contained"
          >
            Go back to Decks
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
