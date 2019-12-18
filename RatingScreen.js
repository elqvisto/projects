//This is an example code to make a Star Rating Bar //
import React, { Component } from "react";
//import react in our code.
import {
  StyleSheet,
  View,
  Platform,
  Text,
  Image,
  TouchableOpacity
} from "react-native";

import kort from "./assets/kort.png";
import { black } from "ansi-colors";
//import all the components we are going to use.

export default class Myapp extends Component<{}> {
  constructor() {
    super();
    this.state = {
      Default_Rating: 0,
      //To set the default Star Selected
      Max_Rating: 5
      //To set the max number of Stars
    };

    //Filled Star. You can also give the path from local
    this.Star =
      "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png";

    //Empty Star. You can also give the path from local
    this.Star_With_Border =
      "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png";
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

  UpdateRating(key) {
    this.setState({ Default_Rating: key });
    //Keeping the Rating Selected in state
  }
  render() {
    let React_Native_Rating_Bar = [];
    //Array to hold the filled or empty Stars
    for (var i = 1; i <= this.state.Max_Rating; i++) {
      React_Native_Rating_Bar.push(
        <TouchableOpacity
          activeOpacity={0.7}
          key={i}
          onPress={this.UpdateRating.bind(this, i)}
        >
          <Image
            style={styles.StarImage}
            source={
              i <= this.state.Default_Rating
                ? { uri: this.Star }
                : { uri: this.Star_With_Border }
            }
          />
        </TouchableOpacity>
      );
      //<Image style={styles.image} source={kort} />;
    }

    return (
      <View style={styles.MainContainer}>
        <View style={styles.toptop}>
          <Text style={styles.textStyle}>Superkilen</Text>
          <Text style={styles.textStyleSmall}>Nørrebrogade 208</Text>
          <Text style={styles.textStyleSmallBottom}>2200 København N</Text>
        </View>
        <View style={styles.top}>
          <Image style={styles.imageStyle} source={kort} />
        </View>

        {/* <Text style={styles.textStyle}>Hvor mange stjerner vil du give?</Text> */}
        {/*  <Text style={styles.textStyleSmall}>...</Text> */}
        {/*View to hold our Stars*/}
        <View style={styles.childView}>{React_Native_Rating_Bar}</View>
        {/*   <Text style={styles.textStyle}> */}
        {/*To show the rating selected*/}
        {/*     {this.state.Default_Rating} / {this.state.Max_Rating}
        </Text> */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() =>
            alert(
              "Du har givet " + this.state.Default_Rating + " stjerner"
            )
          }
        >
          {/*Clicking on button will show the rating as an alert*/}
          <Text
            style={{
              color: "white",
              fontSize: 20,
              textAlign: "center"
            }}
          >
            Indsend anmeldelse
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
//--------------------STYLES-----------------------
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0
  },
  toptop: {},
  top: {
    height: "10%",
    width: "20%",
    alignItems: "center",
    justifyContent: "center"
    /* borderColor: "#eb4034",
    borderWidth: 2 */
  },
  childView: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30
  },
  button: {
    //Knappen
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
    padding: 15,
    backgroundColor: "#eb4034",
    borderRadius: 50
  },
  StarImage: {
    width: 40,
    height: 40,
    resizeMode: "cover"
    /* borderColor: "#00ff00",
    borderWidth: 2 */
  },
  textStyle: {
    textAlign: "center",
    fontSize: 20,
    color: "#000",
    fontWeight: "600",
    marginBottom: 10
  },
  textStyleSmall: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "300",
    color: "#000"
  },
  textStyleSmallBottom: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "300",
    color: "#000",
    marginBottom: 10
  },
  imageStyle: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover"
    /* borderColor: "#000000",
    borderWidth: 2 */
  }
});
