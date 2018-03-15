import React from "react";
import { Text, View, Button } from "react-native";

var ImagePicker = require("react-native-image-picker");

import * as firebaseAPI from "../firebase";

export default class FileUpload extends React.Component {
  /**
   *
   */
  getImageAsBlob = () => {
    return new Promise((resolve, reject) => {
      ImagePicker.showImagePicker({}, response => {
        fetch(response.uri)
          .then(response2 => {
            return response2.blob();
          })
          .then(
            blob => {
              return resolve(blob);
            },
            error => {
              return resolve(error);
            }
          );
      });
    });
  };

  /**
   *
   */
  _uploadFile = async () => {
    try {
      const blob = await this.getImageAsBlob();
      console.log("got blob", blob);
      const uploadResults = await firebaseAPI.uploadImage(blob);
      console.log("uploaded blob", uploadResults);
      return firebaseAPI.addObjectToCollection({
        collection: "assets",
        objectData: uploadResults
      });
    } catch (e) {
      alert("_uploadFile", JSON.stringify(e));
    }
  };

  // this.props.navigation.navigate("detail")
  render() {
    return <Button title="Upload File" onPress={this._uploadFile} />;
  }
}
