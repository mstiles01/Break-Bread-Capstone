import React, { Component } from 'react';
import { Link } from "react-router-dom";
import EditRecipeModal from "./EditRecipeModal"

class RecipeCard extends Component {
    render() {
        return (
            <div className="card">
            <div className="card-content">
                <h3>Recipe Name:</h3> <b>{this.props.recipes.name}</b>
                <p>Type: {this.props.recipes.type}</p>
                <button type="button" onClick={() => this.props.deleteRecipe(this.props.recipes.id)}>Scrap This!</button>
                <Link to={`/recipes/${this.props.recipes.id}`}><button>Recipe Details</button></Link>

            </div>
            </div>
        );

        
    }
}

export default RecipeCard
