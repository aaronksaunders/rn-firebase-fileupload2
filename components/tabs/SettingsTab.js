import React from "react";
import { Text, View, StatusBar, Button, AsyncStorage } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import * as firebaseAPI from "../../firebase";

import SettingsDisplayComponent from "../SettingDisplayComponent";

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
        <SettingsDisplayComponent
          doSignOut={this._signOutAsync}
          user={userInfo}
        />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default StackNavigator({ screen: SettingsScreen });
