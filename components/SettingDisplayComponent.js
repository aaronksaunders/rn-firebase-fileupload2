import React, { Component } from "react";
import { Text, View, Button } from "react-native";

export default class SettingsDisplayComponent extends React.Component {
  state = {};

  render() {
    let { user: { id, email, firstName, lastName }, doSignOut } = this.props;
    return [
      <View style={{ flex: 1, alignItems: "flex-start", padding: 20 }}>
        <Text>Settings!</Text>
        <Text>{id}</Text>
        <Text>{firstName}</Text>
        <Text>{lastName}</Text>
        <Text>{email}</Text>
      </View>,
      <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
        <Button title="Sign Out" onPress={doSignOut} />
      </View>
    ];
  }
}
