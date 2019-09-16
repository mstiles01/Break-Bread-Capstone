import React, { Component } from 'react';
import RecipeManager from '.././modules/RecipeManager';
import EditRecipeModal from './EditRecipeModal'

class RecipeDetail extends Component {
    state = {
        recipes: [],
        name: "",
        type: "",
        ingredients: "",
        id: "",
        loadingStatus: true,
    }

    componentDidMount(){
        RecipeManager.getRecipes(this.props.recipeId)

        .then((recipe) => {
            this.setState({
                name: recipe.name,
                type: recipe.type,
                ingredients: recipe.ingredients,
                id: recipe.id,
                loadingStatus: false
            });
        });
    }

    handleDelete = () => {
        this.setState({loadingStatus: true})
        RecipeManager.deleteRecipe(this.props.recipeID)
        .then(() => this.props.history.push("/recipes"))
    }

    editRecipe = (obj, id) => {
        return RecipeManager.editRecipe(obj, id)
        .then((recipe) => {
            this.setState({
                name: recipe.name,
                type: recipe.type,
                ingredients: recipe.ingredients,
                id: recipe.id,
                loadingStatus: false
            });
        });
    }

    render() {
        return (
          <div className="card">
            <div className="card-content">
                <h3>Name: <span style={{ color: 'darkslategrey' }}>{this.state.name}</span></h3>
                <p>Type: {this.state.type}</p>
                <p>Ingredients: {this.state.ingredients}</p>
                <button type="button" disabled={this.state.loadingStatus} onClick={this.handleDelete}>Toss this out</button>
                <EditRecipeModal {...this.props}
                editRecipe={this.editRecipe} />{" "}
            </div>
          </div>
        );
      }
}

export default RecipeDetail
