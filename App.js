import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoginScreen from "./LoginScreen";
import GymScreen from "./GymScreen";
import MapScreen from "./MapScreen";
import CameraScreen from "./CameraScreen";
import RatingScreen from "./RatingScreen";

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Map: {
    screen: MapScreen
  },
  Gym: {
    screen: GymScreen
  },
  Camera: {
    screen: CameraScreen
  },
  Rating: {
    screen: RatingScreen
  }
});
//oncalloutpress

export default createAppContainer(AppNavigator);
