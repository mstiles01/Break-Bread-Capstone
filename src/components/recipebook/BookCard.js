import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './BookCardStyle.css'


class BookCard extends Component {
    render() {
        return (
            <div className="card">
            <div className="bookCard-Content">
                <h3>Book Name:</h3> <b>{this.props.recipeBooks.name}</b>
                <p>Description: {this.props.recipeBooks.description}</p>
                <div className="bookDelBTN">
                <button type="button" onClick={() => this.props.deleteRecipeBook(this.props.recipeBooks.id)}>Scrap This!</button>
                </div>
                <div className="bookRecPageLink">
                <Link to={`/recipeBooks/${this.props.recipeBooks.id}`}><button>Recipes</button></Link>
                </div>

            </div>
            </div>
        );


    }
}

export default BookCard