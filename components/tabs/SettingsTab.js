import React from "react";
import { Text, View, StatusBar, Button, AsyncStorage } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import * as firebaseAPI from "../../firebase";

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };

  state = {
    userInfo: {}
  };

  componentDidMount = async () => {
    let userInfo = await firebaseAPI.getUserProfile();
    console.log("getCurrentUser", userInfo);
    this.setState(state => ({ userInfo }));
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    await firebaseAPI.logOut();
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings!</Text>
        {/* <Text>{this.state.userInfo.id}</Text> */}
        {/* <Text>{this.state.userInfo.email}</Text> */}
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <Button title="Pay Invoice" onPress={this._showStripe} />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default StackNavigator({ screen: SettingsScreen });
