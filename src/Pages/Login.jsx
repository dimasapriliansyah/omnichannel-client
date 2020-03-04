import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { authLogin } from "../redux/actions";

class LoginPage extends Component {

  constructor(props) {
    super(props)
    this.state = { username: "", password: "" }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  onSubmit(evt) {
    evt.preventDefault()
    this.props.authLogin({
      username: this.state.username,
      password: this.state.password
    });
  }
  render() {
    const { authError, authUser, authGroupSkill, isLoading } = this.props
    if (authUser !== null && authGroupSkill !== null && authError === null) {
      return (
        <Redirect to="/channel" />
      )
    }
    return (
      <div className="form-membership">
        <div className="form-wrapper">
          <h5>Singular Channel App</h5>
          <form onSubmit={this.onSubmit}>
            <div className="form-group input-group-lg">
              <input
                id="username"
                name="username"
                type="text"
                className="form-control"
                placeholder="username"
                autoComplete="off"
                required
                autoFocus
                value={this.state.username}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group input-group-lg">
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                placeholder="password"
                autoComplete="off"
                required
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            {
              isLoading ? <p>Loading</p> : <button className="btn btn-primary btn-lg btn-block" type="submit">
                Let's go!
              </button>
            }
            {
              authError !== null && <p className="text-danger" style={{marginTop: "10px"}}>{authError.errorMessage}</p>
            }
          </form>
        </div>
      </div>
    )

  }
}

const mapStateToProps = state => {
  const { auth } = state
  return {
    authUser: auth.agentDataUser,
    authGroupSkill: auth.agentDataGroupSkill,
    authError: auth.error,
    isLoading: auth.isLoading
  }
}


export default connect(mapStateToProps, { authLogin })(LoginPage)