import React from "react";
import { TabNavigator, StackNavigator } from "react-navigation";

import HomeTab from "./HomeTab";
import SettingsTab from "./SettingsTab";

export default TabNavigator({
  Home: { screen: HomeTab },
  Settings: { screen: SettingsTab }
});
