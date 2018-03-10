import AuthLoadingScreen from "./components/auth/AuthLoadingScreen";
import LoginScreen from "./components/auth/LoginScreen";
import SignUpScreen from "./components/auth/SignUpScreen";
// import HomeScreen from "./components/HomeScreen";
// import OtherScreen from "./components/OtherScreen";

import TabStack from "./components/tabs/TabNavigation";

import { StackNavigator, SwitchNavigator } from "react-navigation"; // Version can be specified in package.json

// const AppStack = StackNavigator({
//   Home: HomeScreen,
//   Other: OtherScreen
// });
const AuthStack = StackNavigator({
  SignIn: LoginScreen,
  SignUp: SignUpScreen
});

export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: TabStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);
