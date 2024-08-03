import React from "react";
import { View, Button } from "react-native";
// import { launchCamera } from "react-native-image-picker";
import * as DocumentPicker from "expo-document-picker";
// import RNFS from "react-native-fs";

export default function NewScreen() {
  const getTest = async () => {
    try {
      // Update the URL to match the correct backend address
      const response = await fetch("http://localhost:3000/");
      const json = await response.json();
      console.log('Response:', json);
    } catch (error) {
      console.error(error);
    }
  }
  
  const _pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      console.log(result.assets);

      if (result.assets.length > 0) {
        // console.log(result.assets[0].uri);
        const a = result.assets[0];
        console.log("asjdfljadslkf", a.uri);
  
        // Create a new FormData object
        const formData = new FormData();
        formData.append("title", "hi");
        formData.append("file", {
          fileName: a.uri,
          name: a.name,
          type: "application/pdf",
        });
        for (var key of formData.entries()) {
          console.log(key[0] + ", " + key[1]);
        }
  
        // Send the form data to the backend
        const response = await fetch("http://localhost:3000/upload-files", {
          method: "POST",
          body: formData,
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
        });
  
        if (response.ok) {
          console.log("File uploaded successfully");
        } else {
          console.error("File upload failed");
        }
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };
  //   const handleCameraLaunch = async (isCamera) => {
  //     const options = {
  //       mediaType: isCamera ? "photo" : "video",
  //     };

  //     try {
  //       const response = await launchCamera(options);
  //       console.log("pickedFile", response);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  //   const uploadFileOnPressHandler = async () => {
  //     try {
  //       const pickedFile = await DocumentPicker.pickSingle({
  //         type: [DocumentPicker.types.allFiles],
  //       });
  //       console.log("pickedFile", pickedFile);

  //       await RNFS.readFile(pickedFile.uri, "base64").then((data) => {
  //         console.log("base64", data);
  //       });
  //     } catch (err) {
  //       if (DocumentPicker.isCancel(err)) {
  //         console.log(err);
  //       } else {
  //         console.log(error);
  //         throw err;
  //       }
  //     }
  //   };

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Camera"
        onPress={async () => {
          console.log("jsadkfl;asd");
          _pickDocument();
          //   handleCameraLaunch(true);
        }}
      />
      <Button
        title="Video"
        onPress={async () => {
          console.log("jsadkfl;asd");
          getTest()

          //   handleCameraLaunch(false);
        }}
      />
      <Button
        title="Gallary"
        onPress={async () => {
          console.log("jsdflksfd");
          //   uploadFileOnPressHandler();
        }}
      />
    </View>
  );
}
