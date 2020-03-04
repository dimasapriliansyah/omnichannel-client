import React, { Component } from 'react';


import Messages from "./Messages";

class DialogBody extends Component {

  componentDidUpdate() {
    const el = document.getElementsByClassName('chat-body')
    el[0].scrollTop = el[0].scrollHeight - el[0].clientHeight
  }

  render() {
    const currentDialog = this.props.currentDialog
    if (currentDialog === null) {
      return (
        <div className="chat-body no-message">
          <div className="no-message-container">
            <i className="fa fa-comments-o"></i>
          </div>
        </div>
      )
    }
    return (

      <div className="chat-body">
        {
          currentDialog.messages && <Messages currentDialog={currentDialog} />
        }
      </div>
    );
  }

}

export default DialogBody;
