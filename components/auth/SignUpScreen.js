import React from "react";
import {
  AsyncStorage,
  View,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Keyboard
} from "react-native";

import * as firebaseAPI from "../../firebase";

export default class SignUpScreen extends React.Component {
  static navigationOptions = { title: "Please Sign Up" };

  state = { input: {} };

  _createAccountAsync = async () => {
    console.log(this.state.input);
    let { email, firstName, lastName, password, password2 } = this.state.input;
    if (password !== password2) return;
    if (firstName && lastName && email && password) {
      firebaseAPI
        .registerUser({ firstName, lastName, email, password })
        .then(results => {
          console.log("registerUser", results);
          return firebaseAPI.getUserProfile();
        })
        .then(
          user => {
            console.log(user);
            this.props.navigation.navigate("App");
          },
          error => {
            console.log("registerUser - Error", error);
            alert("Error: registerUser: " + error);
          }
        );
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <View style={styles.container}>
            <TextInput
              style={styles.textInput}
              placeholder="first name"
              autoCapitalize="none"
              onChangeText={text =>
                this.setState({
                  input: {
                    ...this.state.input,
                    firstName: text
                  }
                })
              }
              value={this.state.input.firstName}
            />
            <TextInput
              style={styles.textInput}
              placeholder="last name"
              autoCapitalize="none"
              onChangeText={text =>
                this.setState({
                  input: {
                    ...this.state.input,
                    lastName: text
                  }
                })
              }
              value={this.state.input.lastName}
            />
            <TextInput
              style={styles.textInput}
              keyboardType="email-address"
              placeholder="email address"
              autoCapitalize="none"
              onChangeText={text =>
                this.setState({
                  input: {
                    ...this.state.input,
                    email: text
                  }
                })
              }
              value={this.state.input.email}
            />
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              autoCapitalize="none"
              placeholder="password"
              onChangeText={text =>
                this.setState({
                  input: {
                    ...this.state.input,
                    password: text
                  }
                })
              }
              value={this.state.input.password}
            />
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              autoCapitalize="none"
              placeholder="password confirm"
              onChangeText={text =>
                this.setState({
                  input: {
                    ...this.state.input,
                    password2: text
                  }
                })
              }
              value={this.state.input.password2}
            />
            <View style={{ marginTop: 15 }} />
            <Button title="Create Account" onPress={this._createAccountAsync} />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: -150,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    marginTop: 10,
    height: 40,
    paddingLeft: 5,
    width: "80%",
    borderColor: "gray",
    borderWidth: Platform.OS == "ios" ? 1 : 0
  }
});
