import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import { Redirect } from "react-router-dom";

import { queueCount, contactAdd, updateCurrentDialog } from "../../redux/actions";
import Navbar from '../../Layout/Navbar/Navbar'
import Whatsapp from "../Whatsapp/index";

import { TENANT_ID, SOCKET_URL } from "../../env";

let socket;

const Pages = () => (
  <Switch>
    <Route path="/channel/whatsapp" component={Whatsapp} />
  </Switch>
);

class Home extends Component {

  constructor(props) {
    super(props)
    this.queueCounter = this.queueCounter.bind(this)
    this.addContact = this.addContact.bind(this)
    this.newInteractionWhatsapp = this.newInteractionWhatsapp.bind(this)
  }

  queueCounter(message) {
    const count = message.whatsapp
    const { queueCount } = this.props
    queueCount(count, 'whatsapp')
    console.log("countQueue", message)
  }

  addContact(message) {
    const { contactAdd } = this.props
    message.count = 0
    contactAdd(message)
  }

  newInteractionWhatsapp(message) {
    const { updateCurrentDialog } = this.props
    updateCurrentDialog(message)
  }

  componentDidMount() {
    console.log("[Component:Home]=> componentDidMount")
    const { authUser, routeProps } = this.props

    if (!authUser) {
      return routeProps.history.push('/login')
    }

    const { username, groupId, name, level } = authUser

    socket = socketIOClient(SOCKET_URL + `?username=${username}&tenantId=${TENANT_ID}&groupId=${groupId}&level=${level}&name=${name}`)

    socket.on("countQueue", this.queueCounter)

    socket.on("newQueue", this.addContact)

    socket.on("newInteraction:whatsapp", this.newInteractionWhatsapp)

  }

  componentWillUnmount() {
    if (typeof socket !== 'undefined') {
      socket.off("countQueue");
      socket.off("newQueue");
      socket.off("newInteraction:whatsapp");
    }
  }

  render() {
    const { authUser } = this.props
    if (authUser === null) {
      return (
        <Redirect to="/login" />
      )
    }

    return (
      <div className="layout">
        <Navbar username={authUser.username} />
        <Route path="/channel" component={Pages} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { auth } = state
  return {
    authUser: auth.agentDataUser
  }
}

export default connect(mapStateToProps, {
  queueCount, contactAdd, updateCurrentDialog
})(Home)
