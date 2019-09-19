import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CopyRecipeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            activeUserId: parseInt(sessionStorage.getItem("credentials")),
            newRecipeId: 0,
            recipes: []
        }

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({ modal: !prevState.modal }));
    }


    handleSubmit = () => {


        // create object for the copied skill with activeUser's id
        const newRecipeCard = {
            name: this.props.recipes.name,
            userId: this.state.activeUserId,
            type: this.props.recipes.type,
            ingredients: this.props.recipes.ingredients

        }

        // post the new recipe to database, pass the id to cloneResources and copy all the resources
        this.props.copyRecipe(newRecipeCard)
        .then(postedRecipe => {
            console.log(postedRecipe)
            this.cloneResources(postedRecipe.id)
            this.props.copiedRecipeState(postedRecipe)
        }).then(this.toggle);
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
                isComplete: false
            }

            return newRecipeDetail;
        })

        // map over the new resources and post to the database
        newRecipeDetails.map(newRecipeDetail => this.props.copyRecipe(newRecipeDetail));
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
                            Are you sure you want to copy this recipe?
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