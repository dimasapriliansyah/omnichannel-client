import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import "./css/index.css"
import Router from './Router'
import store from './redux/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    );
  }

}

export default App;
