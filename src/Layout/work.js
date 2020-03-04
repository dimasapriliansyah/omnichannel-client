import React, { Component } from 'react';
import { connect } from "react-redux";
import Contact from './Contact/Contact'
import Dialog from './Dialog/Dialog'
import Profile from './Profile/Profile'
import Queue from './Queue/Queue'

class work extends Component {

  render() {
    const isAgentOnline = false
    const contactListCount = 0
    const currentContact = null
    const queueCount = 0

    console.log("render")
    console.log("this.props", this.props)

    return (


      <div className="content" style={{ padding: "1em" }}>
        <div className="sidebar-group">
          <div id="chats" className="sidebar active">
            <Contact
              changeOnlineHandler={this.changeOnlineHandler}
              isAgentOnline={isAgentOnline}
              contactListCount={contactListCount}
              currentContact={currentContact}
            />
            <Queue queueCount={queueCount} />
          </div>
        </div>
        <Dialog currentContact={currentContact} />
        <Profile currentContact={currentContact} />
      </div>


    );
  }
}

const mapStateToProps = state => {
  const { auth } = state
  return {
    authUser: auth.agentDataUser,
    authGroupSkill: auth.agentDataGroupSkill,
  }
}

export default connect(mapStateToProps)(work);
