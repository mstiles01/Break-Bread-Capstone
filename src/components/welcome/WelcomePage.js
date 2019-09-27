// Purpose: Export Welcome Page Component

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Jumbotron } from "reactstrap";
import "./WelcomePageStyle.css";
import {Button} from "reactstrap";
import RegisterModal from "../auth/Register"


export default class Welcome extends Component {
  render() {
    return (
      <div className="welcomeContainerImg">

        <React.Fragment>
          <Container id="welcomeContainer">

            <div className="welcomeOverlay"></div>
            <Row>
              <Col className="welcomePage">
                <div className="boarderText">
                <h1 id="headerText">Welcome To BreakBread</h1>
                </div>
              </Col>
            </Row>
            <div className="Reg_Log_Container">
            <Row>
              <Col className="welcomePage">
                <RegisterModal {...this.props}>
                </RegisterModal>
              </Col>
            </Row>
            <Row>
              <Col className="welcomePage">
                <p>or</p>
              </Col>
            </Row>
            <Row>
              <Col className="welcomePage">
                <Button to="/login">
                  <p>Login</p>
                </Button>
              </Col>
            </Row>
            </div>
          </Container>
        </React.Fragment>

      </div>


    );
  }
}