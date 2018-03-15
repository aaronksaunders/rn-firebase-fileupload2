import React, { Component } from "react";
import { ActionSheetIOS, Platform } from "react-native";
import PhotoBrowser from "react-native-photo-browser";
import { Text, View, Button } from "react-native";

import * as firebaseAPI from "../firebase";

export default class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.media = [
      {
        thumb: "https://placeimg.com/640/480/any",
        photo: "https://placeimg.com/640/480/any",
        caption: "photo one",
        selected: false
      },
      {
        thumb: "https://placeimg.com/640/480/tech",
        photo: "https://placeimg.com/640/480/tech",
        caption: "photo two",
        selected: false
      }
    ]; // thumbnail version of the photo to be displayed in grid view. actual photo is used if thumb is not provided // a remote photo or local media url // photo caption to be displayed // set the photo selected initially(default is false)
  }

  componentDidMount() {
    firebaseAPI
      .queryObjectCollection({ collection: "assets" })
      .then(data => console.log("componentDidMount", data));
  }

  onSelectionChanged = (media, index, selected) => {
    alert(`${media.photo} selection status: ${selected}`);
  };

  onActionButton = (media, index) => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showShareActionSheetWithOptions(
        { url: media.photo, message: media.caption },
        () => {},
        () => {}
      );
    } else {
      alert(`handle sharing on android for ${media.photo}, index: ${index}`);
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Detail Screen!</Text>
        <PhotoBrowser
          onBack={navigator.pop}
          mediaList={this.media}
          initialIndex={0}
          displayNavArrows={true}
          displaySelectionButtons={true}
          displayActionButton={true}
          startOnGrid={true}
          enableGrid={true}
          useCircleProgress={false} // NEED THIS TO REMOVE ART LIB LINK ERROR
          onSelectionChanged={this.onSelectionChanged}
          onActionButton={this.onActionButton}
          alwaysDisplayStatusBar={true}
          customTitle={(index, rowCount) => `${index} sur ${rowCount}`}
        />;
      </View>
    );
  }
}
