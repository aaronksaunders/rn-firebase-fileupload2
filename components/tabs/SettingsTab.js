import React from "react";
import { Text, View, StatusBar, Button, AsyncStorage } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  _showStripe = async () => {};
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings!</Text>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <Button title="Pay Invoice" onPress={this._showStripe} />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default StackNavigator({ screen: SettingsScreen });
