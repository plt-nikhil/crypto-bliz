import React, { Component } from 'react';
import Layout from "./components/Layout/Layout";
import AppConsumer from "./context/AppConsumer";

import './App.css';

class App extends Component {
  render() {
    return (
      <AppConsumer>
          {(appProps) => (
            <Layout appProps={appProps} />
          )}
        </AppConsumer>
    );
  }
}

export default App;
