import React from "react";
import { 
    AsyncStorage, View, ActivityIndicator, StatusBar,
    StyleSheet, Button
 } from "react-native";

export default class SignUpScreen extends React.Component {
    static navigationOptions = {
      title: 'Please Sign Up',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Button title="Create Account" onPress={this._signInAsync} />
        </View>
      );
    }
  
    _signInAsync = async () => {
      await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('App');
    };
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });