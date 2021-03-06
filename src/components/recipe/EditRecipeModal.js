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
        recipeBookId: parseInt(0),
        bookList: [],
        activeUserId: parseInt(sessionStorage.getItem("credentials")),
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
        recipeBookId: recipes.recipeBookId,
        id: recipes.id
      });
    });
  }

  // function that updates an existing event
  updateExistingRecipe = evt => {

    evt.preventDefault(); // stops evt?
    if (this.state.name === "" || this.state.type === "" || this.state.ingredients === "" || this.state.recipeBookId === this.state.ingredients){
    window.alert("Please Fill Out All Fields");
    }
    else {
    this.setState({ loadingStatus: true });
    const editedRecipe = {
      // creates edited event object with the values that we type in inputs
      name: this.state.name,
      type: this.state.type,
      ingredients: this.state.ingredients,
      userId: this.state.userId,
      id: this.props.recipeId,
      activeUserId: this.state.activeUserId,
      recipeBookId: parseInt(this.state.recipeBookId)

    };


    // invokes editEvent function from EvenList.js, passes edited object and the id, and then closes modal
    this.props
      .editRecipe(editedRecipe, this.props.recipeId)
      .then(() => this.toggle());
  }
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
    const activeUser = parseInt(sessionStorage.getItem("credentials"))


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
              value= {this.state.recipeBookId}
              name="RecipeBookId"
              id="recipeBookId"
              onChange={this.handleFieldChange}
            >
              {this.props.bookList.map(book => (book.userId === activeUser ?
                <option key={book.name} id={this.state.recipeBookId} value={book.id}  name={book.name}>
                  {book.name}
                </option> : null
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

