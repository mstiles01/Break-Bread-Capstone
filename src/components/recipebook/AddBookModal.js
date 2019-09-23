import React from "react";
import RecipeBookManager from '../modules/RecipeBookManager'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form
} from "reactstrap";
class addBookModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      unmountOnClose: true,
      name: "",
      description: ""
      // put properties here
    };
    this.toggle = this.toggle.bind(this);
    this.changeUnmountOnClose = this.changeUnmountOnClose.bind(this);
  }
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);

  };
  constructNewBook = evt => {
    evt.preventDefault();
    if (this.state.name === "" || this.state.description === "") {
      window.alert("Please fill out the form right, idiot head.");
    } else {
      const recipeBooks = {
        name: this.state.name,
        description: this.state.description,
        userId: this.props.activeUser()
      };
      this.props.addNewBook(recipeBooks).then(() => this.toggle());
    }
  };
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  changeUnmountOnClose(e) {
    let value = e.target.value;
    this.setState({ unmountOnClose: JSON.parse(value) });
  }

  addNewBook = obj => {
    return RecipeBookManager.postBook(obj).then(() => {
      RecipeBookManager.getAllBooks(this.props.activeUser()).then(books => {
            this.setState({
              books: books
            });
        });
    });
}

  // put functionality here  example:handle field change
  render() {
    return (
      <div>
        <Form inline onSubmit={e => e.preventDefault()}>
          {" "}
          <Button color="primary" onClick={this.toggle}>
            Add New Recipe Book
          </Button>
        </Form>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          unmountOnClose={this.state.unmountOnClose}


        >
          <ModalHeader toggle={this.toggle}>Add Recipe Book</ModalHeader>
          <ModalBody>
            {/* put form info */}
            <Input
              id="name"
              type="text"
              onChange={this.handleFieldChange}
              placeholder="Add Book Name"
            />
            <Input
            id="description"
            type="text"
            onChange={this.handleFieldChange}
            placeholder="Add Book Description"
          />


          </ModalBody>
          <ModalFooter>
            {/* put buttons */}
            <Button color="primary" onClick={this.constructNewBook}>
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
export default addBookModal;