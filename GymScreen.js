import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import superKilen from "./assets/Superkilen.jpg";
import LocationDatabase from "./LocationDatabase";

const database = new LocationDatabase();

export default class GymScreen extends React.Component {
  static navigationOptions = {
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#eb4034"
    },
    headerBackTitleStyle: {
      color: "white"
    }
  };
  render() {
    const { navigate, getParam } = this.props.navigation;
    const location = database.getSingleLocation(
      getParam("locationId", "NO-ID")
    );
    return (
      <ImageBackground
        source={location.image}
        style={{ width: "100%", height: "120%" }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity // Navigerer til kamera
              onPress={() => navigate("Camera", { username: "Mia" })}
              style={{
                backgroundColor: "#eb4034",
                margin: 20,
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
                  textAlign: "center"
                }}
                //tilføjer det navn, som hører til det valgte ID
              >
                Tilføj foto {location.whatis}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity //Navigerer til Rating
              onPress={() => navigate("Rating", { username: "Mia" })}
              style={{
                backgroundColor: "#eb4034",
                margin: 20,
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
                  textAlign: "center"
                }}
              >
                Tilføj anmeldelse
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
