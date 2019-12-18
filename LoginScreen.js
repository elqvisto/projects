import React from "react";
import {
  View,
  Button,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput
} from "react-native";

import { UserDatabase } from "./UserDatabase";
import LoginImg from "./assets/LoginImage.jpg";

const userDatabase = new UserDatabase();

export default class HomeScreen extends React.Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  login() {
    const { navigate } = this.props.navigation;
    const { username, password } = this.state;
    const user = userDatabase.authenticateUser(username, password);
    if (user) {
      navigate("Map", { username: user.userName });
    } else {
      alert("UNKNOWN USER");
    }
  }

  render() {
    return (
      <ImageBackground
        source={LoginImg}
        style={{ width: "100%", height: "120%" }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TextInput //userName input
            style={styles.inputStyle}
            keyboardType="default"
            placeholder="Username"
            placeholderTextColor="white"
            color="white"
            onChangeText={text =>
              this.setState({ ...this.state, username: text })
            }
          />
          <TextInput //login input
            style={styles.inputStyleP}
            keyboardType="default"
            placeholder="Password"
            placeholderTextColor="white"
            color="white"
            secureTextEntry={true}
            onChangeText={text =>
              this.setState({ ...this.state, password: text })
            }
          />

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity //loginKnap
              onPress={() => this.login()}
              style={{
                backgroundColor: "#eb4034",
                margin: 80,
                flex: 1,
                height: 60,
                justifyContent: "center",
                borderColor: "#eb4034",
                borderWidth: 4,
                borderRadius: 50
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

// ------------ Styles ----------------------------------
const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: "#eb403470",
    borderRadius: 50,
    paddingLeft: 20,
    width: 250,
    height: 50,
    marginBottom: 20
  },
  inputStyleP: {
    backgroundColor: "#eb403470",
    borderRadius: 50,
    paddingLeft: 20,
    width: 250,
    height: 50
  }
});
