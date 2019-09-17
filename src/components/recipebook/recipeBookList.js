import React, { Component } from 'react'
import RecipeCard from '../recipe/RecipeCard'
import RecipeManager from '../modules/RecipeManager'
import AddRecipeModal from '../recipe/AddRecipeModal'

class RecipeBookList extends Component {
    state = {
      recipes: [],
    }

   componentDidMount() {
    RecipeManager.getBookRecipes(this.props.bookId)
    .then((recipes) => {
        this.setState({
            recipes: recipes
        })
    })
   }

   addNewRecipe = obj => {
    return RecipeManager.postRecipe(obj).then(() => {
        RecipeManager.getBookRecipes(this.props.bookId).then(recipes => {
            this.setState({
              recipes: recipes
            });
        });
    });
}

   deleteRecipe = id => {
    return RecipeManager.deleteRecipe(id)
    .then(() => {
        RecipeManager.getBookRecipes(this.props.bookId)
        .then((recipes) => {
            this.setState({
              recipes: recipes
            });
        });
    });
   }

   render() {
    return (
      <React.Fragment>
        <section className="button__container">
          <AddRecipeModal addNewRecipe={this.addNewRecipe} {...this.props} />
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

export default RecipeBookList