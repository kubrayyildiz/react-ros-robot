import React, { Component } from "react";
import Connection from "./Connection";

class About extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>About</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id iusto
          cumque quod, temporibus aspernatur dolorem, dicta blanditiis provident
          explicabo quidem quos a illum, ea minus praesentium veniam molestiae
          vitae incidunt.
        </p>
        <Connection/>
      </div>
    );
  }
}

export default About;
