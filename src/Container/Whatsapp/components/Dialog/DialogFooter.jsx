import React, { Component } from 'react';
import { connect } from 'react-redux'

import { sendInteraction } from "../../../../redux/actions";


class DialogFooter extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onMessageSubmit = this.onMessageSubmit.bind(this)
    this.sendMedia = this.sendMedia.bind(this)
    this.state = {
      message: "",
      type: "text"
    }

  }

  onChange(evt) {
    this.setState(
      {
        message: evt.target.value,
        type: "text"
      }
    )
  }

  sendMedia(evt) {
    this.setState(
      {
        message: "",
        type: "media"
      }
    )
  }

  onMessageSubmit(evt) {
    evt.preventDefault()
    const { type } = this.state
    if (type === 'media') {
      console.log('Media not yet implemented')
    } else if (type === 'text') {

      const { sendInteraction, currentDialog, currentUser } = this.props

      const { sessionId, from, fromName } = currentDialog

      const { username } = currentUser

      const { message } = this.state

      const payload = {
        sessionId,
        from,
        fromName,
        username,
        message
      }

      console.log("payload", payload)

      sendInteraction(payload)

      this.setState({ message: "" })


    }
  }

  render() {
    const { currentContact, isLoadingDialog } = this.props

    let disabled = true

    console.log("isLoadingDialog", isLoadingDialog)
    console.log("currentContact", currentContact)

    if (isLoadingDialog === false || currentContact !== null) {
      disabled = false
    }


    return (
      <div className="chat-footer">
        <form onSubmit={this.onMessageSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Send Message..."
            onChange={this.onChange}
            value={this.state.message}
            disabled={disabled}
          />
          <div className="form-buttons">
            <button
              className="btn btn-light btn-floating"
              type="button"
              name="message-send-attachment"
              disabled={disabled}
              onClick={this.sendMedia}
            >
              <i className="fa fa-paperclip"></i>
            </button>
            <button
              className="btn btn-primary btn-floating"
              type="submit"
              name="message-send-text"
              onClick={this.onMessageSubmit}
              disabled={disabled}
            >
              <i className="fa fa-send"></i>
            </button>
          </div>
        </form>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  const { contact, dialog, auth } = state
  return {
    currentContact: contact.currentContact,
    currentDialog: dialog.currentDialog,
    currentUser: auth.agentDataUser,
    isLoadingDialog: dialog.isLoading
  }
}

export default connect(mapStateToProps, { sendInteraction })(DialogFooter);
