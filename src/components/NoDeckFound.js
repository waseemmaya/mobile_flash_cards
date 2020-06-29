import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

export default class NoDeckFound extends Component {
  render() {
    return (
      <View style={styles.main}>
        <Card style={styles.card}>
          <Card.Content>
            <Paragraph style={styles.description}>No Deck found</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  card: {
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "red",
  },
  description: {
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "bold",
    color: "white",
  },
});
