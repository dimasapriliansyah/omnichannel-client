import React, { Component } from 'react';
import { connect } from 'react-redux'

import queueEmptyImage from "../../../../media/img/queue_empty.png"

class Queue extends Component {
  render() {
    const { queueCount } = this.props
    return (
      <React.Fragment >
        <header className="bg-green headersm">
          <h6 className="mt-3">
            List Queue [{queueCount}]
          </h6>
        </header>
        <div className="sidebar-body text-center">
          <img src={queueEmptyImage} alt="queue" className="mt-5" width="200" />
          <p className="app-chat-empty-caption">
            <em>
              The queue is empty, what a great job!
            </em>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { queue } = state
  return {
    queueCount: queue.queueCount.whatsapp
  }
}

export default connect(mapStateToProps)(Queue);
