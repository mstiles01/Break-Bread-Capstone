import React, { Component } from "react"
import { Link } from "react-router-dom"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";


class NavBar extends Component {
    logout = () => {
        sessionStorage.clear()
    }

    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
              <ul className="nav nav-pills nav-fill">
                
                  <li className="nav-item">
                      <Link className="nav-link" to="/BookList">
                          Recipe Book
                      </Link>
                      </li>
                      <li className="nav-item">
                      <Link className="nav-link" to="/profile">
                        Profile
                      </Link>
                      </li>
                      <li className="nav-item">
                      <Link className="nav-link" to="/recipes">
                        List of Recipes
                      </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/">
                        <Button onClick={this.logoutUser}>Logout</Button>
                        </Link>
                      </li>

              </ul>
            </nav>
          );
        }
      }

      export default NavBar;
