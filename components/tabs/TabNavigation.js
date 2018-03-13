import React from "react";
import {
  TabNavigator,
  StackNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

import HomeTab from "./HomeTab";
import SettingsTab from "./SettingsTab";

export default TabNavigator({
      Home: {
        screen: HomeTab,
        navigationOptions: () => ({
            tabBarIcon: ({
              tintColor
            }) => {
              return <Icon name = "ios-home"
              color = {
                tintColor
              }
              size = {
                25
              }
              />}
            })
        },
        Settings: {
          screen: SettingsTab,
          navigationOptions: () => ({
              tabBarIcon: ({
                tintColor
              }) => {
                return <Icon name = "ios-information-circle"
                color = {
                  tintColor
                }
                size = {
                  25
                }
                />}
              })
          }
        });