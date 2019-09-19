import React, { Component } from 'react'
import RecipeCard from '../recipe/RecipeCard'
import RecipeManager from '../modules/RecipeManager'
import AddRecipeModal from '../recipe/AddRecipeModal'
import BookListManager from '../modules/RecipeBookManager'

class RecipeBookList extends Component {
    state = {
      recipes: [],
      bookList: []
    }

   componentDidMount() {
    RecipeManager.getBookRecipes(this.props.bookId)
    .then((recipes) => {
        this.setState({
            recipes: recipes
        })
    })
    this.getBookList()
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
    console.log(RecipeObj)
    return RecipeManager.postRecipe(RecipeObj)
  }
  cloneResources = (recipeId) => {

    const newRecipeDetails = this.state.recipes.map(recipes => {
        // create resource object with the new skillId
        const newRecipeDetail = {
            recipeId: recipeId,
            recipeId: recipes.id,
            name: recipes.name,
            type: recipes.type,
            ingredients: recipes.ingredients,
            recipeBookId: typeof this.state.recipeBookId === "string" ? this.props.bookList.find(book => this.state.recipeBookId === book.name).id : this.state.recipeBookId,
            isComplete: false
        }

        return newRecipeDetail;
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
              copyRecipe={this.copyRecipe}
              copiedRecipeState={this.copiedRecipeState}
              cloneResources={this.cloneResources}
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