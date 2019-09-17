import React, { Component } from 'react'
import RecipeCard from './RecipeCard'
import RecipeManager from '../modules/RecipeManager'
import AddRecipeModal from './AddRecipeModal'

class RecipeList extends Component {
    state = {
      recipes: [],
    }

   componentDidMount() {
    RecipeManager.getAllRecipes()
    .then((recipes) => {
        this.setState({
            recipes: recipes
        })
    })
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

export default RecipeList