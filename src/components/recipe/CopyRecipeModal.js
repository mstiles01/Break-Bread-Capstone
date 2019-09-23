import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import BookListManager from '../modules/RecipeBookManager'
import AddBookModal from '../recipebook/AddBookModal'


class CopyRecipeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            activeUserId: parseInt(sessionStorage.getItem("credentials")),
            newRecipeId: 0,
            recipes: [],
            bookList: [],
            recipeBookId: "",
            userId: ""
        }

        this.toggle = this.toggle.bind(this);

    }

    toggle() {
        this.setState(prevState => ({ modal: !prevState.modal }));
    }


    handleSubmit = () => {
        if(this.state.recipeBookId === "") {
            window.alert("Please Select A Recipe Book");
        }
        else{
        // create object for the copied recipe with activeUser's id
        const newRecipeCard = {
            name: this.props.recipes.name,
            userId: this.state.activeUserId,
            type: this.props.recipes.type,
            ingredients: this.props.recipes.ingredients,
            recipeBookId: this.state.recipeBookId


        }


        // post the new recipe to database, pass the id to cloneResources and copy all the resources
        this.props.copyRecipe(newRecipeCard)
            .then(postedRecipe => {
                this.cloneResources(postedRecipe.id)
                this.props.copiedRecipeState(postedRecipe)
            }).then(this.toggle);
        }
    }

    cloneResources = (recipeId) => {
        const newRecipeDetails = this.state.recipes.map(recipes => {
            // create resource object with the new skillId
            const newRecipeDetail = {
                recipeId: recipeId,
                recipeId: recipes.id,
                name: recipes.name,
                type: recipes.type,
                ingredients: recipes.ingredients,
                recipeBookId: this.state.recipeBookId,
                isComplete: false
            }

            return newRecipeDetail;
        })

        // map over the new resources and post to the database
        newRecipeDetails.map(newRecipeDetail => this.props.copyRecipe(newRecipeDetail));
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    getBookList() {
        BookListManager.getAllBooks()
          .then((bookList) => {
            this.setState({
              bookList: bookList
            })
          })
      }





    render() {


        return (
            <>
                <Button onClick={this.toggle} color="success">
                    Copy Recipe
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Copy </ModalHeader>
                    <ModalBody>
                    <section className="copy__addBook__modal">

          </section>
                        <select
                            name="recipeBookId"
                            id="recipeBookId"
                            onChange={this.handleFieldChange} >
                                <option value="">Please Select Book</option>

                            {this.props.bookList.map(book => ( book.userId === this.props.activeUser() ?
                                <option key={book.name} id={this.state.recipeBookId} value={book.id}  name={book.name}>
                                    {book.name}
                                </option> : null
                            ))}
                        </select>


                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.handleSubmit} color="success">Yes</Button>
                        <Button onClick={this.toggle} color="success">No</Button>
                    </ModalFooter>
                </Modal>
            </>
        )

    }
}

export default CopyRecipeModal;