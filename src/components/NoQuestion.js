import React, { Component } from "react";
import { Text, View } from "react-native";

export default class NoQuestion extends Component {
  render() {
    return (
      <View>
        <Text> No question found in this deck</Text>
      </View>
    );
  }
}
