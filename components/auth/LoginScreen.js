import React from "react";
import {
  AsyncStorage,
  View,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";

import * as firebaseAPI from "../../firebase";

export default class LogInScreen extends React.Component {
  static navigationOptions = {
    title: "Please sign in"
  };

  state = {
    input: {}
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} onTouchCancel="true">
        <TextInput
          style={{
            height: 40,
            paddingLeft: 5,
            width: "80%",
            borderColor: "gray",
            borderWidth: Platform.OS == "ios" ? 1 : 0
          }}
          keyboardType="email-address"
          placeholder="email address"
          autoCapitalize="none"
          onChangeText={text =>
            this.setState({
              input: { email: text, password: this.state.input.password }
            })
          }
          value={this.state.input.email}
        />
        <TextInput
          style={{
            marginTop: 10,
            paddingLeft: 5,
            height: 40,
            width: "80%",
            borderColor: "gray",
            borderWidth: Platform.OS == "ios" ? 1 : 0
          }}
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={text =>
            this.setState({
              input: { password: text, email: this.state.input.email }
            })
          }
          value={this.state.text}
        />
        <View>
          <View style={{ marginTop: 20 }}>
            <Button title="Sign in!" onPress={this._signInAsync} />
          </View>
          <View style={{ marginTop: 10 }}>
            <Button title="Create Account" onPress={this._signUp} />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  _signInAsync = () => {
    //await AsyncStorage.setItem("userToken", "abc");
    let { email, password } = this.state.input;

    if (!email && !password) {
      return;
    }

    firebaseAPI.loginWithEmail(email, password).then(
      user => {
        console.log(user);
        this.props.navigation.navigate("App");
      },
      error => {
        alert(error);
        console.log(error);
      }
    );
  };

  //    this.props.navigation.navigate('Other');
  _signUp = () => {
    this.props.navigation.navigate("SignUp");
  };
}

const styles = StyleSheet.create({
  container: {
    marginTop: -150,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
