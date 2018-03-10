import React from "react";
import {
  AsyncStorage,
  View,
  ActivityIndicator,
  StatusBar,
  StyleSheet
} from "react-native";

import * as firebaseAPI from "../../firebase";

export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let user = await firebaseAPI.authCheck();
    // Listen for authentication state to change.
    if (user != null) {
      this.props.navigation.navigate("App");
    } else {
      this.props.navigation.navigate("Auth");
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
