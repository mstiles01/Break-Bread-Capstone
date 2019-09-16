import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Form
} from "reactstrap";
import AuthenticationManager from "../modules/AuthenticationManager";


class EditBioModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false,
        unmountOnClose: true,
        // put properties here
        userId: "",
        bio: "",
        loadingStatus: false
      };
      // toggle from reactstrap
    this.toggle = this.toggle.bind(this);
    // does this remove the modal from the screen when finished??? what does this do?
    this.changeUnmountOnClose = this.changeUnmountOnClose.bind(this);
    }

    // handleFieldChange function that takes an event as a parameter.
  // whatever is typed in the inputs changes state
  handleFieldChange = evt => {
    // stores empty obj in variable called stateToChange
    const stateToChange = {};
    // stateToChange targets the id of the targeted event and sets it equal to the value of the targeted event
    stateToChange[evt.target.id] = evt.target.value;
    // sets the state of stateToChange using the value of the targeted event
    this.setState(stateToChange);
  };

  // function that takes the id of an event (from an API method) and changes the state of the event
  componentDidMount() {
    // getEvent fetch. fetches a single event to be edited
    AuthenticationManager.getUser(this.props.activeUser()).then(user => {
      this.setState({
        // changing state of the event object from the getEvent
        bio: user.bio,
        userId: user.userId
      });
    });
  }

  // function that updates an existing event
  updateExistingBio = evt => {
    evt.preventDefault(); // stops evt?
    this.setState({ loadingStatus: true });
    const editedBio = {
      // creates edited event object with the values that we type in inputs
      bio: this.state.bio,
      userId: this.state.userId
    };

    this.props
      // invokes editEvent function from EvenList.js, passes edited object and the id, and then closes modal
      .editedBio(editedBio, this.props.users.id)
      .then(() => this.toggle());
  };

  // toggle function that opens/closes modal from ReactStrap
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  // not sure what this does? from ReactStrap
  changeUnmountOnClose(e) {
    let value = e.target.value;
    this.setState({ unmountOnClose: JSON.parse(value) });
  }

  // render function. most JSX came from ReactStrap
  render() {
    return (
      // div containing the modal. probably needs a class and/or id
      <div>
        {/* form for adding an event button */}
        <Form inline onSubmit={e => e.preventDefault()}>
          {" "}
          {/* button that makes the modal appear. the button toggles the modal on click */}
          <Button color="primary" onClick={this.toggle}>
            Edit Bio
          </Button>
        </Form>
        {/* Modal that contains the input fields to edit event */}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          unmountOnClose={this.state.unmountOnClose}
        >
          <ModalHeader toggle={this.toggle}>Edit Bio</ModalHeader>
          {/* Modal Body */}
          <ModalBody>
            {/* input fields */}
            <Input
              id="bio" // has to match json
              type="text"
              onChange={this.handleFieldChange}
              value={this.state.name}
            />

          </ModalBody>
          <ModalFooter>
            {/* put buttons */}
            <Button color="primary" onClick={this.updateExistingRecipe}>
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditBioModal;

