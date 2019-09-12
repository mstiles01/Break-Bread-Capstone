import React, { Component } from 'react';
import RecipeManager from '.././modules/RecipeManager';

class RecipeDetail extends Component {
    state = {
        name: "",
        type: "",
        ingredients: "",
        loadingStatus: true,
    }

    componentDidMount(){
        RecipeManager.get(this.props.recipeId)
        .then((recipe) => {
            this.setState({
                name: recipe.name,
                type: recipe.type,
                ingredients: recipe.ingredients,
                loadingStatus: false
            });
        });
    }

    handleDelete = () => {
        this.setState({loadingStatus: true})
        RecipeManager.delete(this.props.recipeID)
        .then(() => this.props.history.push("/recipes"))
    }

    render() {
        return (
          <div className="card">
            <div className="card-content">
                <h3>Name: <span style={{ color: 'darkslategrey' }}>{this.state.name}</span></h3>
                <p>Type: {this.state.type}</p>
                <p>Ingredients: {this.state.ingredients}</p>
                <button type="button" disabled={this.state.loadingStatus} onClick={this.handleDelete}>Toss this out</button>
            </div>
          </div>
        );
      }
}

export default RecipeDetail
