import React, { Component } from 'react';
import SearchBarManager from '../modules/SearchBarManager';
import RecipeBookManager from '../modules/RecipeBookManager'
import RecipeManager from '../modules/RecipeManager'


class SearchForm extends Component {
    state = {
        recipies: [],
        recipeBooks: []
    }
    handleFieldChange = (event) => {
        const newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
    }
    executeSearch = (event) => {
        event.preventDefault();

        if (this.state.searchDomain === "recipes") {
            SearchBarManager.searchBooks(this.state.searchInput).then(skills => {
                skills.sort((a, b) => a, b)
                this.setState({
                    results: skills,
                    videoResults: [],
                    webResults: [],
                    allSkills: []
                })
            })
        } else if (this.state.searchDomain === "recipeBooks") {
            RecipeBookManager.getBook(this.state.searchInput).then(videos => {
                this.setState({
                    recipeBooks: recipeBooks.name,
                    recipeBooks: [],
                    allSkills: []
                })
            })
        }  else {
            window.alert("Please select what you would like to search for.")
        }

    }

}

