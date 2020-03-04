import React, { Component } from 'react';
import { connect } from "react-redux";

import Contact from './components/Contact/Contact'
import Dialog from './components/Dialog/Dialog'
import Profile from './components/Profile/Profile'
import Queue from './components/Queue/Queue'


class Whatsapp extends Component {
  constructor(props) {
    super(props)
    this.changeOnlineHandler = this.changeOnlineHandler.bind(this)
  }
  changeOnlineHandler() {
    this.setState({ isAgentOnline: !this.state.isAgentOnline })
  }

  render() {

    const { currentDialog, currentContact } = this.props

    return (
      <div className="content" style={{ padding: "1em" }}>
        <div className="sidebar-group">
          <div id="chats" className="sidebar active">
            <Contact
              changeOnlineHandler={this.changeOnlineHandler}
            />
            <Queue />
          </div>
        </div>
        <Dialog currentDialog={currentDialog} />
        <Profile currentDialog={currentDialog} currentContact={currentContact} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth, dialog, contact } = state
  return {
    authUser: auth.agentDataUser,
    authGroupSkill: auth.agentDataGroupSkill,
    currentDialog: dialog.currentDialog,
    currentContact: contact.currentContact
  }
}

export default connect(mapStateToProps)(Whatsapp);
