import React, { Component } from 'react'
import RecipeCard from './RecipeCard'
import RecipeManager from '../modules/RecipeManager'
import AddRecipeModal from './AddRecipeModal'
import BookListManager from '../modules/RecipeBookManager'

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
        RecipeManager.getAllRecipes(()=>this.props.activeUser())
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

   render() {
    return (
      <React.Fragment>
        <section className="button__container">
          <AddRecipeModal addNewRecipe={this.addNewRecipe} bookList={this.state.bookList} {...this.props} />
        </section>
        <div className="cards__container">
          {this.state.recipes.map(recipes => (
            <RecipeCard
              key={recipes.id}
              recipes={recipes}
              editRecipe={this.editRecipe}
              deleteRecipe={this.deleteRecipe}
              {...this.props}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default RecipeList
