import React, { Component } from 'react';
import { Link } from "react-router-dom";
import RecipeManager from "../modules/RecipeManager"
import CopyRecipeModal from './CopyRecipeModal';
import BookListManager from '../modules/RecipeBookManager'
import './recipeCardStyle.css'

class RecipeCard extends Component {
    state = {
        recipes: [],
        bookList: [],
        userId: 0
    }

    componentDidMount() {
        RecipeManager.getRecipes(this.props.recipes.id).then(recipes => {
            this.setState({
                recipes: recipes,
                userId: recipes.userId
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
        const activeUser = parseInt(sessionStorage.getItem("credentials"))
      const checkUser = this.state.userId === activeUser
        return (
            <div className="card">
                <div className="card-content">
                    <h3>Recipe Name: {this.props.recipes.name}</h3>
                    <h4>Type: {this.props.recipes.type}</h4>

                    <CopyRecipeModal
                        recipes={this.state.recipes}
                        bookList={this.state.bookList}
                        {...this.props}
                    />
                    { checkUser ?
                    <div className="deleteBTN">
                    <button type="button" onClick={() => this.props.deleteRecipe(this.props.recipes.id)}>Scrap This!</button>
                    </div>
                    : null
                }
                    <div className="recpdetsBTN">
                    <Link to={`/recipes/${this.props.recipes.id}`}><button>Recipe Details</button></Link>
                    </div>


                </div>
            </div>
        );


    }
}

export default RecipeCard
