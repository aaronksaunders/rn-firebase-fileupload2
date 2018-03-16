import React from "react";
import { Text } from "react-native";

import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import Button from "./Button";
import CenterView from "./CenterView";
import Welcome from "./Welcome";

import LoginScreen from "../../components/auth/LoginScreen";
import SignUpScreen from "../../components/auth/SignUpScreen";
import SettngsDisplayComponent from "../../components/SettingDisplayComponent";

storiesOf("Auth-User Screens", module)
  .add("Login Screen", () => <LoginScreen />)
  .add("Create Account Screen", () => <SignUpScreen />)
  .add("Settings Display", () => (
    <SettngsDisplayComponent
      doSignOut={action("SettngsDisplayComponent: clicked-doSignOut")}
      user={{
        id: 1000,
        email: "aaron@mail.com",
        firstName: "Aaron",
        lastName: "Saunders"
      }}
    />
  ));
storiesOf("Button", module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add("with text", () => (
    <Button onPress={action("clicked-text")}>
      <Text>Hello Button</Text>
    </Button>
  ))
  .add("with some emoji", () => (
    <Button onPress={action("clicked-emoji")}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ));
