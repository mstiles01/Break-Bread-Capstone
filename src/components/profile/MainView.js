import React, { Component } from 'react';
import AuthenticationManager from '.././modules/AuthenticationManager';


class MainView extends Component {
    state = {
       user: {

       }
    }
    componentDidMount() {
    AuthenticationManager.getUser(this.props.activeUser()).then(user =>
      this.setState(user)  )
    }
    render() {
        console.log(this.state)
        return (
         "hi"
        );
      }
}

export default MainView