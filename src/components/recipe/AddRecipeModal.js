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
import BookListManager from '../modules/RecipeBookManager'

class recipeAddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      unmountOnClose: true,
      name: "",
      type: "",
      recipeBookId: "",
      ingredients: "",
      bookList: [],
      userId: 0,
      modal: false,
      backdrop: true
      // put properties here
    };
    this.toggle = this.toggle.bind(this);
    this.changeBackdrop = this.changeBackdrop.bind(this);
  }
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };
  constructNewRecipe = evt => {
    evt.preventDefault();
    if (this.state.name === "" || this.state.type === "" || this.state.ingredients === "" || this.state.recipeBookId === "" ){
      window.alert("Please Fill Out All Fields");
    } else {

      const recipes = {
        name: this.state.name,
        type: this.state.type,
        ingredients: this.state.ingredients,
      recipeBookId: parseInt(this.state.recipeBookId),
        userId: this.props.activeUser()
      };
      this.props.addNewRecipe(recipes).then(() => this.toggle());
    }
  };
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  changeBackdrop(e) {
    let value = e.target.value;
    if (value !== 'static') {
      value = JSON.parse(value);
    }
    this.setState({ backdrop: value });
  }

  // put functionality here  example:handle field change


  render() {

    return (
      <div>
        <Form inline onSubmit={e => e.preventDefault()}>
          {" "}
          <Button color="primary" onClick={this.toggle}>
            Add New Recipe
          </Button>
        </Form>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          unmountOnClose={this.state.unmountOnClose}
        >
          <ModalHeader toggle={this.toggle}>Add Recipe</ModalHeader>
          <ModalBody>
            {/* put form info */}
            <Input
              id="name"
              type="text"
              onChange={this.handleFieldChange}
              placeholder="Add Recipe Name"
            />
            <Input
              id="type"
              type="text"
              onChange={this.handleFieldChange}
              placeholder="Add Cusine Type"
            />
            <Input
              id="ingredients"
              type="textarea"
              onChange={this.handleFieldChange}
              placeholder="Add Ingredients"


            />



            <select
              name="RecipeBookId"
              id="recipeBookId"
              onChange={this.handleFieldChange}>
                <option value="">Please Select Book</option>
              {this.props.bookList.map(book => ( book.userId === this.props.activeUser() ?
                <option  key={book.id} id={this.state.recipeBookId} value={book.id} name={book.name} >
                  {book.name}

                </option> : null
              ))}


            </select>



          </ModalBody>
          <ModalFooter>
            {/* put buttons */}
            <Button color="primary" onClick={this.constructNewRecipe}>
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

export default recipeAddModal;