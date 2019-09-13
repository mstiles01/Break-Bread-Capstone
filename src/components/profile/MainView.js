import React, { Component } from 'react';
import AuthenticationManager from '.././modules/AuthenticationManager';
import EditBioModal from './EditBioModal';


class MainView extends Component {
    state = {
        user: {
            username: "",
            bio: ""
        }
    }
    componentDidMount() {
        AuthenticationManager.getUser(this.props.activeUser()).then(user =>
            this.setState(user))
    }
    renderBio = () => {
        console.log(this.state)
        return (
            <form>
                <label>
                    Bio:
              <textarea type="text" name="name" />
                </label>
                <input type="submit" value="Submit" />
                {/* refactor button */}

            </form>
        );
    }

    editBio = (obj, id) => {
        return AuthenticationManager.editBio(obj, id).then(() => {
            AuthenticationManager.getAll(this.props.activeUser()).then(bio => {
                this.setState({
                    bio: bio
                });
            });
        })
    }
    render() {
        return (
          <React.Fragment>
              {this.renderBio()}
            <section className="button__container">
              <EditBioModal editBio={this.editBio} {...this.props} />
            </section>

          </React.Fragment>
        );
      }
}

export default MainView