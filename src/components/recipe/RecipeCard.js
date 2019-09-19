import React, { Component } from 'react';
import { Link } from "react-router-dom";
import RecipeManager from "../modules/RecipeManager"
import CopyRecipeModal from './CopyRecipeModal';
import BookListManager from '../modules/RecipeBookManager'


class RecipeCard extends Component {
    state = {
        recipes: [],
        bookList: []
    }

    componentDidMount() {
        RecipeManager.getRecipes(this.props.recipes.id).then(recipes => {
            this.setState({
                recipes: recipes
            })
        })
        this.getBookList()
    }
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
            <div className="card">
                <div className="card-content">
                    <h3>Recipe Name:</h3> <b>{this.props.recipes.name}</b>
                    <p>Type: {this.props.recipes.type}</p>

                    <CopyRecipeModal
                        recipes={this.state.recipes}
                        bookList={this.state.bookList}
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
