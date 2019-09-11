import React, { Component } from "react"
import { Link } from "react-router-dom"


class NavBar extends Component {
    logout = () => {
        sessionStorage.clear()
    }

    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
              <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to="recipie">
                          Recipe Book
                      </Link>

                      </li>
              </ul>
            </nav>
          );
        }
      }

      export default NavBar;
