import React, { Component } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import Config from "../scripts/Config";
import * as Three from "three";
import * as ROSLIB from "roslib";
class RobotState extends Component {
  state = {
    ros: null,
    x: 0,
    y: 0,
    orientation: 0,
    linear_velocity: 0,
    angular_velocity: 0,
  };
  constructor() {
    super();
    this.init_connection();
  }
  init_connection() {
    this.state.ros = new ROSLIB.Ros();
    this.state.ros.on("connection", () => {
      console.log("connection established in Teleoperation Component!");
      this.setState({ connected: true });
    });
    this.state.ros.on("close", () => {
      console.log("connection is closed!");
      this.setState({ connected: false });
      //try to reconnect every 3 seconds
      setTimeout(() => {
        try {
          this.state.ros.connect(
            "ws://" +
              Config.ROSBRIDGE_SERVER_IP +
              ":" +
              Config.ROSBRIDGE_SERVER_PORT +
              ""
          );
        } catch (error) {
          console.log("connection problem");
        }
      }, Config.RECONNECTION_TIMER);
    });

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
    this.getRobotState();
  }
  getRobotState() {
    // create subscriber
    var pose_subscriber = new ROSLIB.Topic({
      ros: this.state.ros,
      name:Config.POSE_TOPIC,
      messageType: "geometry_msgs/PoseWithCovarianceStamped",
    });
    // create callback
    pose_subscriber.subscribe((message) => {
      this.setState({ x: message.pose.pose.position.x.toFixed(2) });
      this.setState({ y: message.pose.pose.position.y.toFixed(2) });
      this.setState({
        orientation: this.getOrientationFromQuaternion(
          message.pose.pose.orientation
        ).toFixed(2),
      });
    });
    //create subscriber for the velocities in the odom topic
    var velocity_subscriber=new ROSLIB.Topic({
        ros: this.state.ros,
        name:Config.ODOM_TOPIC,
        messageType: "nav_msgs/Odometry",
    });
    //callback function for the odom
    velocity_subscriber.subscribe((message) => {
        this.setState({ linear_velocity: message.twist.twist.linear.x.toFixed(2)});
        this.setState({ angular_velocity: message.twist.twist.angular.z.toFixed(2)});
        });
     
}
  getOrientationFromQuaternion(ros_orientation_quaternion) {
    var q = new Three.Quaternion(
      ros_orientation_quaternion.x,
      ros_orientation_quaternion.y,
      ros_orientation_quaternion.z,
      ros_orientation_quaternion.w
    );
    var RPY = new Three.Euler().setFromQuaternion(q);
    return RPY["_z"] * (180 / Math.PI);
  }
  render() {
    return (
      <div>
        <Row>
          <Col>
            <h4 className="mt-4">Position:</h4>
            <p className="mt-0">X:{this.state.x}</p>
            <p className="mt-0">Y:{this.state.y}</p>
            <p className="mt-0">Orientation:{this.state.orientation}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="mt-4">Velocities:</h4>
            <p className="mt-0">
              Linear Velocities:{this.state.linear_velocity}
            </p>
            <p className="mt-0">
              Angular Velocities:{this.state.angular_velocity}
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RobotState;
