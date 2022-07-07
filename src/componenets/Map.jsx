import React, { Component } from "react";
import Config from "../scripts/Config";
import * as ROS2D from "ros2d";
import * as ROSLIB from "roslib";
class Map extends Component {
  state = {
    ros: null,
  };
  constructor() {
    super();
    this.view_map = this.view_map.bind(this);
  }
  init_connection() {
    this.state.ros = new ROSLIB.Ros();
    try {
      this.state.ros.connect(
        "ws://" +
          Config.ROSBRIDGE_SERVER_IP +
          ":" +
          Config.ROSBRIDGE_SERVER_PORT +
          ""
      );
    } catch (error) {
      console.log(
        "ws://" +
          Config.ROSBRIDGE_SERVER_IP +
          ":" +
          Config.ROSBRIDGE_SERVER_PORT +
          ""
      );
      console.log("connection problem");
    }
  }
  componentDidMount() {
    this.init_connection();
    this.view_map();
  }

  view_map() {
    if(document.getElementById("nav_div").innerHTML != "") return;

    var viewer = new ROS2D.Viewer({
      divID: "nav_div",
      width: 640,
      height: 480,
    });
    var gridClient = new ROS2D.OccupancyGridClient({
        ros : this.state.ros,
        rootObject : viewer.scene
    // var navClient = new NAV2D.OccupancyGridClientNav({
    //   ros: this.state.ros,
    //   rootObject: viewer.scene,
    //   viewer: viewer,
    //   serverName: "/move_base",
    //   withOrientation: true,
    });
    gridClient.on('change', function() {
        viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
        viewer.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
      });
  }
  render() {
    return (
      <div>
        <div id="nav_div"></div>
      </div>
    );
  }
}

export default Map;
