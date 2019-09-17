import React, { Component } from 'react'
import BookCard from './BookCard'
import RecipeBookManager from '../modules/RecipeBookManager'
import AddBookModal from './AddBookModal'

class BookList extends Component {
    state = {
      recipeBooks: [],
    }

   componentDidMount() {
    RecipeBookManager.getAllBooks()
    .then((recipeBooks) => {
        this.setState({
            recipeBooks: recipeBooks
        })
    })
   }

   addNewRecipeBook = obj => {
    return RecipeBookManager.postBook(obj).then(() => {
        RecipeBookManager.getAllBooks(this.props.activeUser()).then(recipeBooks => {
            this.setState({
              recipeBooks: recipeBooks
            });
        });
    });
}

   deleteRecipeBook = id => {
    return RecipeBookManager.deleteBook(id)
    .then(() => {
        RecipeBookManager.getAllBooks(()=>this.props.activeUser())
        .then((recipeBooks) => {
            this.setState({
                recipeBooks: recipeBooks
            });
        });
    });
   }

   render() {
    return (
      <React.Fragment>
        <section className="button__container">
          <AddBookModal addNewRecipeBook={this.addNewRecipeBook} {...this.props} />
        </section>
        <div className="cards__container">
          {this.state.recipeBooks.map(recipeBooks => (
            <BookCard
              key={recipeBooks.id}
              recipeBooks={recipeBooks}
              editRecipeBook={this.editRecipeBook}
              deleteRecipeBook={this.deleteRecipeBook}
              {...this.props}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default BookList