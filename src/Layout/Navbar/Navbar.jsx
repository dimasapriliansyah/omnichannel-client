import React, { Component } from 'react';
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { authLogout } from "../../redux/actions";
import logo from '../../logo-white.svg';

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.logoutHandler = this.logoutHandler.bind(this)
  }
  logoutHandler() {
    const { username } = this.props
    const { authLogout } = this.props
    console.log("username", username)
    authLogout(username)
  }
  render() {
    return (
      <nav className="navigation">
        <div className="nav-group">
          <ul>
            <li>
              <a href="#" className="logo">
                <img src={logo} alt="logo" />
              </a>
            </li>
            <li>
              <NavLink exact to="/channel/whatsapp" activeClassName="active">
                <i className="ti-comment-alt"></i>
              </NavLink>
            </li>
            <li className="brackets">
            </li>
            <li>
              <NavLink exact to="/service/internal-chat" activeClassName="active">
                <i className="ti-user"></i>
              </NavLink>
            </li>
            <li>
              <a href="#">
                <i className="ti-settings"></i>
              </a>
            </li>
            <li>
              <Link to="/channel" onClick={this.logoutHandler}>
                <i className="ti-power-off"></i>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}


export default withRouter(connect(null, { authLogout })(Navbar));
