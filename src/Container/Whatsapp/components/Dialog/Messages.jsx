import React, { Component } from 'react';
import dateFormat from "dateformat";


class Messages extends Component {
  render() {
    const { messages } = this.props.currentDialog
    return (
      <div className="messages">

        {
          messages.map((message, index) => {
            const sendDate = dateFormat(message.sendDate, "mmm, dd yyyy HH:MM:ss")
            if (message.messageType === 'text') {
              if (message.actionType === 'in') {
                return (
                  <div className="message-item" key={index}>
                    <div className="message-content">
                      {message.message}
                    </div>
                    <div className="message-action">
                      {
                        sendDate
                      }
                    </div>
                  </div>
                )
              } else if (message.actionType === 'out') {
                return (
                  <div className="message-item outgoing-message" key={index}>
                    <div className="message-content" style={{ color: "#202529" }}>
                      {message.message}
                    </div>
                    <div className="message-action">
                      {
                        sendDate
                      }
                      <i className="ti-double-check"></i>
                    </div>
                  </div>
                )
              }
            }
          })
        }
      </div >
    );
  }

}

export default Messages
