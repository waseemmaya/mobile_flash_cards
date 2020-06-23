import React, { Component } from "react";
import { Snackbar } from "react-native-paper";

export default class SnackBarNotifier extends Component {
  render() {
    return (
      <Snackbar
        onDismiss={this.props.hide}
        action={{
          label: "OK",
          onPress: () => {
            this.props.hide;
            // Do something
          },
        }}
        visible={this.props.visible ? this.props.visible : false}
      >
        {this.props.message ? this.props.message : "Hey there! I'm a Snackbar."}
      </Snackbar>
    );
  }
}
