import React, { Component } from 'react';
import { Link } from "react-router-dom"

class WelcomePage extends Component {

render () {
    return (
        <div className="jumbotron">
          <h1 className="display-4">Start Making With Break Bread!</h1>
          <p><Link className="welcome-link" to="../auth/Register">Click Here to Register</Link></p>
          <p><Link className="welcome-link" to="/Login">Existing Users Log In Here</Link></p>
        </div>
      )

}

}

export default WelcomePage;