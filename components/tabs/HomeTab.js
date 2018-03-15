import React from "react";
import { Text, View, Button } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import FileUpload from "../FileUpload";
import DetailScreen from "../DetailScreen";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };
  _gotoDetails = async () => {
    this.props.navigation.navigate("detail");
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home!</Text>
        <Button title="Go to Details" onPress={this._gotoDetails} />
        <FileUpload />
      </View>
    );
  }
}

export default StackNavigator({
  home: { screen: HomeScreen },
  detail: { screen: DetailScreen }
});
