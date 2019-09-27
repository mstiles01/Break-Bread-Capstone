import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import "./BreakBread.css";
import { BrowserRouter as Router } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';


class BreakBread extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
        <NavBar />
        <ApplicationViews />
        </Router>
      </React.Fragment>
    );
  }
}

export default BreakBread;
