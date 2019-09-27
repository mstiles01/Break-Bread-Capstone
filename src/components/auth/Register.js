
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UserDataManager from '../modules/AuthenticationManager';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            modal: false,
           unmountOnClose: true

        };

        this.toggle = this.toggle.bind(this);
        this.changeUnmountOnClose = this.changeUnmountOnClose.bind(this);
    }

    componentDidMount() {
        // getAll users and hand on
        UserDataManager.getAllUsers()
            .then(users => {
                this.setState({
                    users: users
                })
            })
    }

    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);

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

    handleRegister = event => {
        event.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert("Passwords do not match.")
        } else if (this.state.users.find(user => user.username === this.state.username)) {
            alert("Username already taken.")
        }  else if (this.state.users.find(user => user.email === this.state.email)) {
        alert("This email address is already associated with an account.")
        } else {
        const newUserObject = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }
        UserDataManager.postUser(newUserObject)
            .then(newRegisteredUser => sessionStorage.setItem("credentials", newRegisteredUser.id))
            .then(() => this.props.history.push("/profile"))
        }
    }


    render() {
        return (
            <div>
                <Button className="registerbtn" color="danger" onClick={this.toggle}>Register</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Sign up</ModalHeader>
                    <ModalBody>
                    <form>
                        <fieldset>
                            <div className="loginForm">
                                <input onChange={this.handleFieldChange} type="email"
                                    id="email"
                                    placeholder="Email address"
                                    required
                                    autoFocus=""
                                /><br/>
                                <input onChange={this.handleFieldChange} type="text"
                                    id="username"
                                    placeholder="Username"
                                    required
                                /><br/>
                                <input onChange={this.handleFieldChange} type="password"
                                    id="password"
                                    placeholder="Password"
                                    required
                                /><br/>
                                <input onChange={this.handleFieldChange} type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    required
                                />
                            </div>
                        </fieldset>
                    </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleRegister}>Sign up</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Register;