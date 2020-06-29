import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";

export default class QuestionCard extends Component {
  render() {
    const {
      toggleAnswer,
      answer,
      showAnswer,
      question,
      handleCorrect,
      handleInCorrect,
    } = this.props;
    return (
      <View>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>QUESTION:</Title>
            <Paragraph style={styles.description}>{question}</Paragraph>
          </Card.Content>
        </Card>
        <TouchableOpacity onPress={toggleAnswer}>
          <Card
            style={{
              ...styles.card,
              backgroundColor: !showAnswer ? "#71b394" : "#2A89FF",
            }}
          >
            <Card.Content style={{ alignSelf: "center" }}>
              <Title style={styles.answer}>
                {showAnswer ? answer : "Show Answer"}
              </Title>
            </Card.Content>
          </Card>
        </TouchableOpacity>
        {showAnswer && (
          <View style={styles.btnView}>
            <Button
              style={styles.btn}
              color="#2A89FF"
              mode="contained"
              onPress={handleCorrect}
            >
              Correct
            </Button>
            <Button
              style={styles.btn}
              color="red"
              onPress={handleInCorrect}
              mode="contained"
            >
              In-Correct
            </Button>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#71b394",
  },
  title: {
    color: "white",
    fontSize: 26,
    paddingBottom: 10,
  },
  btn: {
    margin: 10,
    width: "50%",
    alignSelf: "center",
  },
  answer: {
    color: "white",
    fontSize: 26,
  },
  description: {
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "bold",
    color: "white",
  },
  btnView: {
    marginTop: 20,
  },
});
