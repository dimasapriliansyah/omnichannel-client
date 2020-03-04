import React, { Component } from 'react';
import { connect } from 'react-redux'
import { incrementCounterAsync, incrementCounterBy5 } from "../redux/actions";
class ReduxExample extends Component {
  constructor(props) {
    super(props)
    this.state = { counter: 0 }
  }
  incrementCounterBy5 = () => {
    this.props.incrementCounterBy5(5);
  };
  render() {
    return (
      <div>
        <h1>Counter {this.props.count}</h1>
        <button onClick={this.props.incrementCounterAsync}>Increment</button>
        <button onClick={this.incrementCounterBy5}>Increment +5</button>
      </div>

    )
  }
}

const mapStateToProps = state => {
  const { counter } = state
  return {
    count: counter.count
  }
}

export default connect(mapStateToProps, { incrementCounterAsync, incrementCounterBy5 })(ReduxExample)