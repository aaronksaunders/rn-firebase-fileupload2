# React Native Firebase Blob File Upload
Finally doing a firebase file upload with latest release of react-native... and it works

Latest release of react-native supports blobs which FINALLY we can do file uploads out of the box to firebase, no plugins, modules or cloud code required

[Release Notes Feb 2018 - React Native](https://github.com/facebook/react-native/releases/tag/v0.54.0)

## Three Steps

### Get Image
I used the `react-native-image-picker` plugin to get a local file'uri
```javascript
  getimage() {
    return new Promise(resolve => {
      ImagePicker.launchImageLibrary({}, response => {
        return resolve(response);
      });
    });
  }
```
[https://github.com/react-community/react-native-image-picker](https://github.com/react-community/react-native-image-picker)


### Convert Image To Blob
I used the `fetch` API to retrieve the image and convert it to a blob
```javascript
    const response = await fetch(image.uri);
    const blob = await response.blob();
```
[Using Fetch In React Native](https://facebook.github.io/react-native/docs/network.html)


### Basic Firebase File Upload
Once you have a blob, firebase will happily upload it to firebase storage
```javascript
    const ref = firebase
      .storage()
      .ref("aaron")
      .child(new Date().getTime() + "");

    const task = ref.put(blob);

    task.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot =>
        console.log(snapshot.bytesTransferred / snapshot.totalBytes * 100),
      error => {
        console.log("error", error);
        return error;
      },
      result => {
        console.log("result", task.snapshot.metadata);
        return result;
      }
    );
 ```
 [File Upload in Firebase](https://firebase.google.com/docs/storage/web/upload-files)

## Source Code

```javascript
  _uploadFile = async () => {
    
    try {
      // simple function to get image uri from device
      const response = await this.getimage();
      
      // use fetch API to convert the local image to a blob
      // for uploading to firebase
      const response2 = await fetch(response.uri);
      const blob = await response2.blob();
      
      // now that we have the blob, it is uploading to 
      // firebase as described in the documentation
      const ref = firebase
        .storage()
        .ref("aaron")
        .child(new Date().getTime() + "");

      const task = ref.put(blob);

      task.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot =>
          console.log(snapshot.bytesTransferred / snapshot.totalBytes * 100),
        error => {
          console.log("error", error);
          return error;
        },
        result => {
          console.log("result", task.snapshot.metadata);
          return result;
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  ```
