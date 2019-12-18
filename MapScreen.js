import React, { Component } from "react";
import UrbanGymImg from "./assets/dumbbell.png";
import InReach from "./assets/dumbbellGreen.png";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { getDistance } from "geolib"; // Distance function from a library full of usewfull functions  when doing math on geo-coordinates
import LocationDatabase from "./LocationDatabase";

// Data structures and helper functions for doing the GeoFencing. This could/should of course go
//in a separate module. W ekeep it here as paert of teaching for now.

const database = new LocationDatabase();
const pointsOfInterest = database.getAllLocations();

function orderDistanceArray(currentCoords) {
  // calculate distance from currentpos to all points of interest and sort pointsOfInterest array
  //in ascending order of distance
  pointsOfInterest.forEach(p => {
    p.currentDistance = getDistance(currentCoords, p.coords, (accuracy = 1));
  });

  pointsOfInterest.sort((p1, p2) => {
    if (p1.currentDistance < p2.currentDistance) {
      return -1;
    }
    if (p1.currentDistance > p2.currentDistance) {
      return 1;
    }
    return 0;
  }); // Standard in-place sorting of array in order of ascending distance to current location
  // See documentation on sort with compare function here:
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
}

export default class MapScreen extends React.Component {
  static navigationOptions = {
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#eb4034"
    },
    headerBackTitleStyle: {
      color: "white"
    }
  };
  state = {
    location: null,
    errorMessage: null,
    region: null,
    marker: null
  };

  async componentDidMount() {
    await this.AskPermission(); // Check that we have permission to access location data - ask if we don't
    this.watchId = Location.watchPositionAsync(
      {
        accuray: Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 1,
        mayShowUserSettingsDialog: true
      },
      // This is the callback function specifying  all the stuff that we want to happen whenver we have a new location
      currentPosition => {
        orderDistanceArray({
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude
        });

        this.setState({
          location: currentPosition,
          region: {
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude,
            latitudeDelta: 0.075, // About 11 km
            longitudeDelta: 0.075 // About 6 km
          },
          marker: {
            latlng: currentPosition.coords
          },

          error: null
        });
      }
    );
  }

  AskPermission = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log("Asking for geo permission: " + status);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    const { location } = this.state;

    return (
      <MapView style={styles.mapStyle} initialRegion={this.state.region}>
        {this.state.marker ? (
          <Marker
            coordinate={this.state.marker.latlng}
            title={"Her står jeg"}
            pinColor="#eb4034"
          />
        ) : null}
        {pointsOfInterest.map((p, index) => (
          <Marker
            onCalloutPress={() => navigate("Gym", { locationId: p.id })}
            key={index}
            coordinate={p.coords}
            title={p.whatis}
            description="Nørrebrogade 208, 2200 København N"
            image={
              index == 0 && p.currentDistance < p.radius ? InReach : UrbanGymImg
            }
          />
        ))}
      </MapView>
    );
  }
}
// ------------ Styles ----------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center"
  },
  mapStyle: {
    width: "100%",
    height: "100%"
  },
  image: {
    flex: 1,
    width: 400,
    height: 400
  }
});
