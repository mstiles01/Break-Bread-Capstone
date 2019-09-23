import React, { Component } from 'react'
import RecipeCard from './RecipeCard'
import RecipeManager from '../modules/RecipeManager'
import AddRecipeModal from './AddRecipeModal'
import BookListManager from '../modules/RecipeBookManager'
import RecipeBookManager from '../modules/RecipeBookManager'
import AddBookModal from '../recipebook/AddBookModal'
import CopyRecipeModal from '../recipe/CopyRecipeModal'

class RecipeList extends Component {
  state = {
    recipes: [],
    bookList: []
  }

  componentDidMount() {
    RecipeManager.getAllRecipes()
      .then((recipes) => {
        this.setState({
          recipes: recipes
        })
      })
    this.getBookList()
  }

  addNewRecipe = obj => {
    return RecipeManager.postRecipe(obj).then(() => {
      RecipeManager.getAllRecipes(this.props.activeUser()).then(recipes => {
        this.setState({
          recipes: recipes
        });
      });
    });
  }

  deleteRecipe = id => {
    return RecipeManager.deleteRecipe(id)
      .then(() => {
        RecipeManager.getAllRecipes(() => this.props.activeUser())
          .then((recipes) => {
            this.setState({
              recipes: recipes
            });
          });
      });
  }

  getBookList() {
    BookListManager.getAllBooks()
      .then((bookList) => {
        this.setState({
          bookList: bookList
        })
      })
  }

  copiedRecipeState = (obj) => {
    this.setState({
      copiedRecipeList: obj
    })
  }

  copyRecipe = (RecipeObj) => {
    return RecipeManager.postRecipe(RecipeObj)

  }


  addNewBook = obj => {
    return RecipeBookManager.postBook(obj).then(() => {
      RecipeBookManager.getAllBooks(this.props.activeUser()).then(bookList => {
            this.setState({
              bookList: bookList
            });
        });
    });
}


  render() {
    return (
      <React.Fragment>
         <div><h1>Community Recipe List</h1></div>
        <section className="button__container">
        <AddBookModal  addNewBook={this.addNewBook} {...this.props} />
          <AddRecipeModal addNewRecipe={this.addNewRecipe}   bookList={this.state.bookList} {...this.props} />

        </section>
        <div className="cards__container">
          {this.state.recipes.map(recipes => (
            <RecipeCard
              key={recipes.id}
              recipes={recipes}
              deleteRecipe={this.deleteRecipe}
              copyRecipe={this.copyRecipe}
              bookList={this.state.bookList}
              copiedRecipeState={this.copiedRecipeState}
              addNewBook={this.addNewBook}
              {...this.props}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default RecipeList
