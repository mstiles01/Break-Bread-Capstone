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
class recipeAddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      unmountOnClose: true,
      name: "",
      type: "",
      ingredients: "",
      recipeBookId: "",
      loadingStatus: false
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
  constructNewRecipe = evt => {
    evt.preventDefault();
    if (this.state.name === "" || this.state.type === "" || this.state.ingredients === "") {
      window.alert("Please fill out the form right, idiot head.");
    } else {
      this.setState({ loadingStatus: true });
      const recipes = {
        name: this.state.name,
        type: this.state.type,
        ingredients: this.state.ingredients,
        recipeBookId: this.props.bookId,
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
  changeUnmountOnClose(e) {
    let value = e.target.value;
    this.setState({ unmountOnClose: JSON.parse(value) });
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
              type="text"
              onChange={this.handleFieldChange}
              placeholder="Add Ingredients"

            />

            <select
              defaultValue=""
              name="RecipeBookId"
              id="RecipeBookDropDown"
              onChange={this.handleFieldChange}
            >
              <option value="">Select Recipe Book</option>
              {this.props.bookList.map(book => (
                <option key={book.recipeBookId} id={book.recipeBookId} value={book.recipeBookId}>
                  {book.name}
                </option>
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