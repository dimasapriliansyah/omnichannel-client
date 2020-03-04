import React, { Component } from 'react';
import { connect } from "react-redux";
import { autoIn } from "../../../../redux/actions"

class ContactHeader extends Component {

  constructor(props) {
    super(props)
    this.toggleAutoIn = this.toggleAutoIn.bind(this)
  }

  toggleAutoIn(evt) {
    const target = evt.target
    const userid = this.props.authUserData.username
    const { autoIn } = this.props
    const { checked } = target
    autoIn(userid, !checked)
  }

  render() {
    const { pausedStatus, isLoading } = this.props
    return (
      <header>
        <span>Workspace</span>
        <ul className="list-inline" style={{ marginBottom: "12px" }}>
          <li className="list-inline-item">
            <div className="form-item custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                checked={!pausedStatus}
                onChange={this.toggleAutoIn}
                disabled={isLoading ? true : false}
                id="autoInSwitch" />
              <label className="custom-control-label label-autoin-status" htmlFor="autoInSwitch">
                {pausedStatus ? "Pause" : "Play"}
              </label>
            </div>
          </li>
        </ul>
      </header>
    )
  }
}
const mapStateToProps = state => {
  const { autoin, auth } = state
  return {
    authUserData: auth.agentDataUser,
    pausedStatus: autoin.pausedStatus,
    isLoading: autoin.isLoading
  }
}

export default connect(mapStateToProps, { autoIn })(ContactHeader);