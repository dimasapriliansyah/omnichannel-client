import React, { Component } from 'react';

import ContactHeader from './ContactHeader'
import ContactList from './ContactList'

class Contact extends Component {
  render() {
    const changeOnlineHandler = this.props.changeOnlineHandler
    const isAgentOnline = this.props.isAgentOnline
    const contactListCount = this.props.contactListCount
    const currentContact = this.props.currentContact
    return (
      <React.Fragment>
        <ContactHeader
          isAgentOnline={isAgentOnline}
          changeOnlineHandler={changeOnlineHandler}
        />
        <ContactList contactListCount={contactListCount} currentContact={currentContact} />
      </React.Fragment>
    );
  }
}



export default Contact;
