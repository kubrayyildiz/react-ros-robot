import React, { Component } from "react";
// import{Button} from "react-bootstrap"
import Connection from "./Connection";
import Teleoperation from "./Teleoperation";
import RobotState from "./RobotState";
import { Row, Col, Container, Button } from "react-bootstrap";
import Map from "./Map";
class Home extends Component {
  state = {
    // counter:0,
  };
  // increment_counter(){
  //   // this.state.counter=this.state.counter+1;
  //   this.setState({counter:this.state.counter+1})
  //   console.log(this.state.counter)
  // }
  render() {
    return (
      <div>
        <Container>
          <h1 className="text-center mt-3">Robot Control Page</h1>
          <Row>
            <Col>
              <Connection />
            </Col>
          </Row>
          <Row>
            <Col>
              <Teleoperation />
            </Col>
          </Row>
          <Row>
            <Col>
              <RobotState />
            </Col>
            <Col>
              <h1>MAP</h1>
              <Map></Map>
            </Col>
          </Row>

          {/* <h5>Counter:
      <span>{this.state.counter}</span>
      </h5>
      <Button onClick={()=>this.increment_counter()}>Increment</Button> */}
        </Container>
      </div>
    );
  }
}

export default Home;
