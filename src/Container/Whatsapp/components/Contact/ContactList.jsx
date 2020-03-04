import React, { Component } from 'react';
import { connect } from "react-redux";

import { getInteraction, contactSetCurrent, resetProfileTab, getProfile } from "../../../../redux/actions";

import chatEmptyImage from "../../../../media/img/chat_empty.png"
import './Contact.css'

class ContactList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSessionId: null
    }
    this.showDialog = this.showDialog.bind(this)
    this.isActiveList = this.isActiveList.bind(this)
  }

  showDialog(sessionId, channelId, type) {
    this.setState({ currentSessionId: sessionId })
    const { getInteraction, contactSetCurrent, resetProfileTab } = this.props
    getInteraction({ sessionId, channelId, type })
    contactSetCurrent(sessionId)
    resetProfileTab()
  }

  isActiveList(value) {
    const { currentSessionId } = this.state
    const listClass = value === currentSessionId ? 'list-group-item open-chat' : 'list-group-item'
    return listClass
  }


  render() {
    const listsContact = this.props.listsContact
    return (
      <div className="sidebar-body" >
        {
          listsContact.length === 0 ?
            <div>
              <img className="app-chat-empty-img" src={chatEmptyImage} alt="Chat Empty" />
              <p className="app-chat-empty-caption">
                <em>
                  Click the play icon to start helping customer.
                </em>
              </p>
            </div>
            :
            <ul className="list-group list-group-flush">
              {
                listsContact.map((contact, index) => {
                  return (
                    <li
                      className={this.isActiveList(contact.sessionId)}
                      key={contact.sessionId}
                      onClick={() => this.showDialog(contact.sessionId, contact.channelId, 'interaction')}>
                      <figure className="avatar">
                        <span className="avatar-title bg-info rounded-circle">
                          {contact.fromName[0].toUpperCase()}
                        </span>
                      </figure>
                      <div className="users-list-body">
                        <h5>{contact.from}</h5>
                        <p>{contact.fromName}</p>
                        <p>{contact.lastChat.slice(0, 32)}...</p>
                        <div className="users-list-action">

                          {
                            contact.count > 0
                            &&
                            <div className="new-message-count">
                              {contact.count}
                            </div>
                          }

                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
        }

      </div>
    )
  }



}

const mapStateToProps = (state) => {
  const { contact, profile } = state
  return {
    listsContact: contact.contactLists,
    currentTab: profile.currentTab
  }
}

export default connect(mapStateToProps, { getInteraction, contactSetCurrent, resetProfileTab, getProfile })(ContactList);