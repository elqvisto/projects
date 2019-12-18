//import UrbanGymImg from "./dumbbell.png";

//Billeder
import React, { Component } from "react";
import UrbanGymImg from "./assets/dumbbell.png";
import InReach from "./assets/dumbbellGreen.png";

import RundeTårn from "./assets/Rundetaarn.jpg";
import Børsen from "./assets/Børsen.jpg";
import Rosenborg from "./assets/Rosenborg.jpg";
import Bryghus from "./assets/Bryghus.jpg";
import Superkilen from "./assets/Superkilen.jpg";

//

export class PointOfInterest {
  constructor(id, coords, radius, whatis, image) {
    this.id = id;
    this.coords = coords; // Latitude and Longitude
    this.radius = radius; // Radius in circle of interest
    this.whatis = whatis; // Short txt to describe
    this.currentDistance = 99999; // Just put me as far as way as I can to begin with ...
    this.image = image;
  }
}

export default class LocationDatabase {
  locations = {
    1: new PointOfInterest(
      1,
      { latitude: 55.68597, longitude: 12.577291 },
      2000,
      "Rosenborg slot",
      Rosenborg
    ),
    2: new PointOfInterest(
      2,
      { latitude: 55.681547, longitude: 12.575751201 },
      2000,
      "RundeTårn",
      RundeTårn
    ),
    3: new PointOfInterest(
      3,
      { latitude: 55.676038, longitude: 12.584014 },
      2000,
      "Børsen",
      Børsen
    ),
    4: new PointOfInterest(
      4,
      { latitude: 55.673409, longitude: 12.579428 },
      2000,
      "Kongens Bryghus",
      Bryghus
    ),
    5: new PointOfInterest(
      5,
      { latitude: 55.6993533, longitude: 12.5423634 },

      2000,
      "Superkilen",
      Superkilen
    )
  };

  getAllLocations() {
    return Object.values(this.locations);
  }

  getSingleLocation(locationId) {
    return this.locations[locationId];
  }
}
