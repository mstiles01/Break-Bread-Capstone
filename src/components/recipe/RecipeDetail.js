import React, { Component } from 'react';
import RecipeManager from '.././modules/RecipeManager';
import EditRecipeModal from './EditRecipeModal'
import BookListManager from '../modules/RecipeBookManager'
import CopyRecipeModal from '../recipe/CopyRecipeModal'
import './detailsStyles.css'

class RecipeDetail extends Component {
    state = {
        recipes: [],
        name: "",
        type: "",
        ingredients: "",
        id: "",
        recipeBookId: "",
        bookList: [],
        userId: 0,
        activeUserId: parseInt(sessionStorage.getItem("credentials")),
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
                bookId: recipe.recipeBookId,
                userId: recipe.userId,
                loadingStatus: false
            });
        });
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

    recipePushBack = () => {
        this.setState({loadingStatus: true})
        this.props.history.push("/recipes")
    }
    bookPushBack = () => {
        this.setState({loadingStatus: true})
        this.props.history.push("/Booklist")
    }

    editRecipe = (obj, id) => {
        return RecipeManager.editRecipe(obj, id)
        .then((recipe) => {
            this.setState({
                name: recipe.name,
                type: recipe.type,
                ingredients: recipe.ingredients,
                id: recipe.id,
                bookId: recipe.recipeBookId,
                activeUserId: parseInt(sessionStorage.getItem("credentials")),
                loadingStatus: false
            });
        });
    }

    render() {
      const activeUser = parseInt(sessionStorage.getItem("credentials"))
      const checkUser = this.state.userId === activeUser

      return (



          <div className="card">

            <div className="card-content">
                <h3>Name:{this.state.name}</h3>
                <p>Type: {this.state.type}</p>
                <p>Ingredients: {this.state.ingredients}</p>


                <div className="EditRecBTN">
                <button type="button" disabled={this.state.loadingStatus} onClick={this.recipePushBack}>Back to Recipe</button>
                <button type="button" disabled={this.state.loadingStatus} onClick={this.bookPushBack}>Back to Recipe Books</button>

                { checkUser ?
                <div>
                <EditRecipeModal bookList={this.state.bookList} {...this.props}
                editRecipe={this.editRecipe} /> {" "}
                  </div>
                : null
                }


            </div>

            </div>
            <div className="BackgroundDetails">
            hi
            </div>
            </div>




        );
              }

}

export default RecipeDetail
