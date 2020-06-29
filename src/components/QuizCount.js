import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

export default class QuizCount extends Component {
  render() {
    const { total, current } = this.props;
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Quiz Count</Title>
          <Paragraph style={styles.description}>
            {current + 1} / {total}
          </Paragraph>
        </Card.Content>
      </Card>
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
  title: {
    color: "white",
    fontSize: 26,
    paddingBottom: 10,
  },
  description: {
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "bold",
    color: "white",
  },
});
