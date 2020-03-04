import React, { Component } from 'react';
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";

import Navbar from './Navbar/Navbar'
import Contact from './Contact/Contact'
import Dialog from '../Container/Whatsapp/components/Dialog/Dialog'
import Profile from '../Container/Whatsapp/components/Profile/Profile'
import Queue from '../Container/Whatsapp/components/Queue/Queue'

import { SOCKET_URL, TENANT_ID } from '../MAGIC_STRING'

class main extends Component {
  static defaultProps = {
    SOCKET_URL,
    TENANT_ID
  }
  constructor(props) {
    super(props)
    this.state = {
      isAgentOnline: false,
      contactListCount: 0,
      currentContact: null,
      queueCount: 0
    }
    this.changeOnlineHandler = this.changeOnlineHandler.bind(this)
  }
  changeOnlineHandler() {
    this.setState({ isAgentOnline: !this.state.isAgentOnline })
  }
  componentDidMount() {
    const { authUser, authGroupSkill } = this.props
    if (!authUser || !authGroupSkill) {
      return this.props.history.push('/login')
    }
    const { username, groupId, name, level } = authUser
    const tenantId = this.props.TENANT_ID
    const socketEndpoint = this.props.SOCKET_URL

    // const socket = 
    socketIOClient(socketEndpoint + `?userId=${username}&tenant_id=${tenantId}&group_id=${groupId}&type=${level}&name=${name}`)
    // socket.on("incoming",()=>{

    // })
  }
  render() {
    const isAgentOnline = this.state.isAgentOnline
    const contactListCount = this.state.contactListCount
    const currentContact = this.state.currentContact
    const queueCount = this.state.queueCount

    console.log("render")
    console.log("this.props", this.props)

    return (
      <div className="layout">
        <Navbar groupSkill={this.props.authGroupSkill} />
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

export default connect(mapStateToProps)(main);
