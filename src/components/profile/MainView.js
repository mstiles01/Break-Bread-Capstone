import React, { Component } from 'react';
import AuthenticationManager from '.././modules/AuthenticationManager';
import EditBioModal from './EditBioModal';
import ProfileManager from '../modules/ProfileManager'


class MainView extends Component {
    state = {
        user: {
            username: "",
            bio: "",
            email: "",
            password: ""
        }
    }
    componentDidMount() {
        AuthenticationManager.getUser(this.props.activeUser()).then(user =>
            this.setState(user))
    }


    editBio = (obj, id) => {
        return ProfileManager.editBio(obj, id).then(() => {
            AuthenticationManager.getUser(this.props.activeUser()).then(user =>
                this.setState(user))
        })
    }

    // postNewBio = obj => {
    //     return ProfileManager.postNewBio(obj).then((bio) => {
    //         this.setState

    //     });
    // }
    render() {
        return (
          <React.Fragment>
             <h3>{this.state.username}</h3>
             <p>{this.state.bio}</p>
            <section className="button__container">
              <EditBioModal editBio={this.editBio} {...this.props} />
            </section>

          </React.Fragment>
        );
      }
}

export default MainView