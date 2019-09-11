import React, { Component } from 'react';
import RecipeManager from '../../modules/EmployeeManager';

class RecipeDetail extends Component {
    state = {
        name: "",
        type: "",
        loadingStatus: true,
    }

    componentDidMount(){
        RecipeManager.get(this.props.recipeID)
        .then((user) => {
            this.setState({
                name: user.username,
                loadingStatus: false
            });
        });
    }

    handleDelete = () => {
        this.setState({loadingStatus: true})
        RecipeManager.delete(this.props.recipeID)
        .then(() => this.props.history.push("/recipe"))
    }

    render() {
        return (
          <div className="card">
            <div className="card-content">
                <h3>Name: <span style={{ color: 'darkslategrey' }}>{this.state.name}</span></h3>
                <p>Type: {this.state.type}</p>
                <button type="button" disabled={this.state.loadingStatus} onClick={this.handleDelete}>Toss this out</button>
            </div>
          </div>
        );
      }
}

export default RecipeDetail
