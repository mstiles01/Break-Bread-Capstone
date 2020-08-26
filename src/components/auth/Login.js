import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserDataManager from "../modules/AuthenticationManager"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state ={
        email: "",
        password: "",
        users: [],
        modal: false,
         unmountOnClose: true
    };
    this.toggle = this.toggle.bind(this);
    this.changeUnmountOnClose = this.changeUnmountOnClose.bind(this);

}

    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
    };

    handleLogin = event => {
        event.preventDefault();
        UserDataManager.checkUsers(this.state.email, this.state.password).then(
            checkedUsers => {
                if (checkedUsers.length > 0) {
                    sessionStorage.setItem("credentials", checkedUsers[0].id);
                    this.props.trigger()
                    this.props.history.push("/profile");
                } else {
                    alert("Invalid email or password");
                }
            }
        );
    };

    componentDidMount() {
        UserDataManager.getAllUsers().then(users => {
            this.setState({
                users: users
            });
        });
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    changeUnmountOnClose(e) {
        let value = e.target.value;
        this.setState({ unmountOnClose: JSON.parse(value) });
      }

    render() {
        return (
            <React.Fragment>
                <div>
                <Button className="registerbtn" color="danger" onClick={this.toggle}>Login</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Sign up</ModalHeader>
                    <ModalBody>
                    <form onSubmit={this.handleLogin}>
                    <fieldset className="loginSection">
                        <h3>Please Log In</h3>
                        <div className="loginForm">
                            <input
                                onChange={this.handleFieldChange}
                                type="email"
                                id="email"
                                placeholder="Email address"
                                required
                                autoFocus=""
                            /><br />
                            <input
                                onChange={this.handleFieldChange}
                                type="password"
                                id="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                        </fieldset>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleLogin}>Login</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>


            </React.Fragment>
        );
    }


}

export default Login;