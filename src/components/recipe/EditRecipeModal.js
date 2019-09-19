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
import RecipeManager from "../modules/RecipeManager";

class EditRecipeModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false,
        unmountOnClose: true,
        // put properties here
        recipes: [],
        userId: "",
        name: "",
        type: "",
        ingredients: "",
        bookList: [],
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
    RecipeManager.getRecipes(this.props.recipeId).then(recipes => {
      this.setState({
        // changing state of the event object from the getEvent
        name: recipes.name,
        type: recipes.type,
        ingredients: recipes.ingredients,
        userId: recipes.userId,
        recipeBookId: this.props.bookId,
        id: recipes.id
      });
    });
  }

  // function that updates an existing event
  updateExistingRecipe = evt => {
    evt.preventDefault(); // stops evt?
    this.setState({ loadingStatus: true });
    const editedRecipe = {
      // creates edited event object with the values that we type in inputs
      name: this.state.name,
      type: this.state.type,
      ingredients: this.state.ingredients,
      userId: this.state.userId,
      id: this.props.recipeId,
      recipeBookId: this.props.bookId
    };

    // invokes editEvent function from EvenList.js, passes edited object and the id, and then closes modal
    this.props
      .editRecipe(editedRecipe, this.props.recipeId)
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
            Edit Recipe
          </Button>
        </Form>
        {/* Modal that contains the input fields to edit event */}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          unmountOnClose={this.state.unmountOnClose}
        >
          <ModalHeader toggle={this.toggle}>Edit Recipe</ModalHeader>
          {/* Modal Body */}
          <ModalBody>
            {/* input fields */}
            <Input
              id="name" // has to match json
              type="text"
              onChange={this.handleFieldChange}
              value={this.state.name}
            />
            <Input
              id="type"
              type="text"
              onChange={this.handleFieldChange}
              value={this.state.type}
            />
            <Input
              id="ingredients"
              type="textarea"
              onChange={this.handleFieldChange}
              value={this.state.ingredients}
            />
             <select
              defaultValue=""
              name="RecipeBookId"
              id="RecipeBookDropDown"
              onChange={this.handleFieldChange}
            >
              <option value="">Select Recipe Book</option>
              {this.props.bookList.map(book => (
                <option key={book.name} id={book.name} value={book.name}>
                  {book.name}
                </option>
              ))}
            </select>
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

export default EditRecipeModal;

