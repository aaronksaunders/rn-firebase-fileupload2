import React from "react";
import { Text, View, StatusBar, Button, AsyncStorage } from "react-native";
var ImagePicker = require("react-native-image-picker");
import { TabNavigator, StackNavigator } from "react-navigation";

import firebase from "firebase";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };
  _gotoDetails = async () => {
    this.props.navigation.navigate("detail");
  };

  getimage() {
    return new Promise(resolve => {
      ImagePicker.launchImageLibrary({}, response => {
        return resolve(response);
      });
    });
  }

  _uploadFile = async () => {
    debugger;
    try {
      const response = await this.getimage();
      const response2 = await fetch(response.uri);
      const blob = await response2.blob();
      const ref = firebase
        .storage()
        .ref("aaron")
        .child(new Date().getTime() + "");

      const task = ref.put(blob);

      task.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot =>
          console.log(snapshot.bytesTransferred / snapshot.totalBytes * 100),
        error => {
          console.log("error", error);
          return error;
        },
        result => {
          console.log("result", task.snapshot.metadata);
          return result;
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  // this.props.navigation.navigate("detail")
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home!</Text>
        <Button title="Go to Details" onPress={this._gotoDetails} />
        <Button title="Upload File" onPress={this._uploadFile} />
      </View>
    );
  }
}

class DetailScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Detail Screen!</Text>
      </View>
    );
  }
}

export default StackNavigator({
  home: { screen: HomeScreen },
  detail: { screen: DetailScreen }
});
