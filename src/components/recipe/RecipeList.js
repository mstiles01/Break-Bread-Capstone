import React, { Component } from 'react'
import RecipeCard from './RecipeCard'
import RecipeManager from '../modules/RecipeManager'
import AddRecipeModal from './AddRecipeModal'

class RecipeList extends Component {
    state = {
      recipes: [],
    }

   componentDidMount() {
    RecipeManager.getAll()
    .then((recipes) => {
        this.setState({
            recipes: recipes
        })
    })
   }

   deleteRecipe = id => {
    RecipeManager.delete(id)
    .then(() => {
        RecipeManager.getAll()
        .then((newRecipes) => {
            this.setState({
              recipes: newRecipes
            })
        })
    })
   }
   render() {
    return (
      <React.Fragment>
        <section className="button__container">
          <AddRecipeModal addNewNews={this.addNewRecipe} {...this.props} />
        </section>
        <div className="cards__container">
          {this.state.recipes.map(recipes => (
            <RecipeCard
              key={recipes.id}
              recipes={recipes}
              editRecipes={this.editRecipes}
              deleteRecipes={this.deleteRecipes}
              {...this.props}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default RecipeList