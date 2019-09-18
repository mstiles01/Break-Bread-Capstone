import React, { Component } from 'react';
import { Link } from "react-router-dom";
import RecipeManager from "../modules/RecipeManager"
import CopyRecipeModal from './CopyRecipeModal';


class RecipeCard extends Component {
    state = {
        recipes: []
    }

    componentDidMount() {
        RecipeManager.getRecipes(this.props.recipes.id).then(recipes => {
            this.setState({
                recipes: recipes
            })
        })
    }



    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <h3>Recipe Name:</h3> <b>{this.props.recipes.name}</b>
                    <p>Type: {this.props.recipes.type}</p>

                    <CopyRecipeModal
                        recipes={this.state.recipes}
                        {...this.props}
                    />

                    <button type="button" onClick={() => this.props.deleteRecipe(this.props.recipes.id)}>Scrap This!</button>
                    <Link to={`/recipes/${this.props.recipes.id}`}><button>Recipe Details</button></Link>


                </div>
            </div>
        );


    }
}

export default RecipeCard
