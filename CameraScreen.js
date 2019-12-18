/* import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  CameraRoll
} from "react-native";
import Constants from "expo-constants";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermissions: false,
      ratio: "16:9"
    };
  }
  static navigationOptions = {
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#eb4034"
    },
    headerBackTitleStyle: {
      color: "white"
    }
  };

  async componentDidMount() {
    let { status } = await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({
      hasCameraPermissions: status === "granted"
    });
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };

  onPictureSaved = async photo => {
    await CameraRoll.saveToCameraRoll(photo.uri, "photo");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}></View>
        {this.state.hasCameraPermissions ? (
          <View style={styles.cameraContainer}>
            <Camera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.camera}
              type={Camera.Constants.Type.back}
              ratio={this.state.ratio}
              onCameraReady={this.collectPictureSizes}
            ></Camera>
          </View>
        ) : null}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.snapButton}
            onPress={this.takePicture}
          ></TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row"
  },
  camera: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "space-between",
    aspectRatio: 9 / 16
  },
  /*  topBar: {
    flex: 0.1,
    backgroundColor: "#eb4034",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: Constants.statusBarHeight
  }, 
  bottomBar: {
    flex: 0.2,
    flexDirection: "row",
    paddingBottom: 5,
    backgroundColor: "#eb4034",
    justifyContent: "space-around",
    alignItems: "center"
  },
  snapButton: {
    borderColor: "white",
    height: 50,
    width: 50,
    borderWidth: 1,
    borderRadius: 100
  }
});
 */

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  CameraRoll
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default class App extends React.Component {
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back
  };

  static navigationOptions = {
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#eb4034"
    },
    headerBackTitleStyle: {
      color: "white"
    }
  };

  async componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    // Camera roll Permission
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === "granted" });
  };

  handleCameraType = () => {
    const { cameraType } = this.state;

    this.setState({
      cameraType:
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };

  onPictureSaved = async photo => {
    await CameraRoll.saveToCameraRoll(photo.uri, "photo");
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });
  };

  render() {
    const { hasPermission } = this.state;
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.cameraType}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 30
              }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent"
                }}
                onPress={() => this.pickImage()}
              >
                <Ionicons
                  name="ios-photos"
                  style={{ color: "#fff", fontSize: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent"
                }}
                onPress={() => this.takePicture()}
              >
                <FontAwesome
                  name="camera"
                  style={{ color: "#fff", fontSize: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent"
                }}
                onPress={() => this.handleCameraType()}
              >
                <MaterialCommunityIcons
                  name="camera-switch"
                  style={{ color: "#fff", fontSize: 40 }}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
