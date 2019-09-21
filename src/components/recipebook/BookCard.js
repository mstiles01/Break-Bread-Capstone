import React, { Component } from 'react';
import { Link } from "react-router-dom";


class BookCard extends Component {
    render() {
        return (
            <div className="card">
            <div className="card-content">
                <h3>Book Name:</h3> <b>{this.props.recipeBooks.name}</b>
                <p>Description: {this.props.recipeBooks.description}</p>
                <button type="button" onClick={() => this.props.deleteRecipeBook(this.props.recipeBooks.id)}>Scrap This!</button>
                <Link to={`/recipeBooks/${this.props.recipeBooks.id}`}><button>Recipes</button></Link>

            </div>
            </div>
        );


    }
}

export default BookCard