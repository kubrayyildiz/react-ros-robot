import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router,Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
class Body extends Component {
  render() {
    return (
      <Container>
        <Router>
          <Routes>
            <Route path="/" exact element={<Home/>}></Route>
            <Route path="/about" exact element={<About/>}></Route>
          </Routes>
        </Router>
      </Container>
    );
  }
}
export default Body;
