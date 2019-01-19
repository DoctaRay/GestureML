import React, { Component } from 'react';
import Recorder from "react-recorder";

// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  handleStop = console.log

  render() {
    return (
      <div className="app">
        <div className="recorder-container">
          <Recorder onStop={this.handleStop} />
        </div>
      </div>
    );
  }
}

export default App;
