import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import "./BreakBread.css";
import { BrowserRouter as Router } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';


class BreakBread extends Component {
  state = {
    toggle: true
  }

triggerRender = () => {
this.setState({
  toggle: !this.state.toggle
})
}
  render() {
    return (
      <React.Fragment>
        <Router>
        <NavBar trigger={this.triggerRender} />
        <ApplicationViews trigger={this.triggerRender} />
        </Router>
      </React.Fragment>
    );
  }
}

export default BreakBread;
