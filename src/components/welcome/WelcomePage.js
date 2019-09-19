// Purpose: Export Welcome Page Component

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Jumbotron } from "reactstrap";


export default class Welcome extends Component {
  render() {
    return (
      <Jumbotron>
        <React.Fragment>
          <Container id="welcomeContainer">
            <Row>
              <Col className="welcomePage">
                <h1 id="header">Welcome To BreakBread</h1>
              </Col>
            </Row>
            <Row>
              <Col className="welcomePage">
                <Link to="/register">
                  <p>Register</p>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col className="welcomePage">
                <p>or</p>
              </Col>
            </Row>
            <Row>
              <Col className="welcomePage">
                <Link to="/login">
                  <p>Login</p>
                </Link>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      </Jumbotron>
    );
  }
}