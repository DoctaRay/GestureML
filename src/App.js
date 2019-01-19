import React, { Component } from 'react';
import videojs from 'video.js';

import 'videojs-record/dist/videojs.record.js';
import 'webrtc-adapter';
import 'recordrtc';

// import logo from './logo.svg';
// import './App.css';

const config = {
    controls: true,
    width: 640,
    height: 480,
    fluid: false,
    plugins: {
        record: {
            audio: false,
            video: true,
            maxLength: 10,
            debug: true
        }
    }
};

class App extends Component {
  constructor(props) {
    super(props);

    // Reference to element in the DOM tree.
    this.recorder = React.createRef();
  }

  componentDidMount() {
    this.player = videojs(this.recorder, config, this.handleVideoInit);
    this.player.on('startRecord', this.handleStartRecord);
    this.player.on('stopRecord', this.handleFinishRecord)
  }

  componentWillUnmount() {
    const { player } = this;
    if (player) player.dispose();
  }

  handleVideoInit = () => {}
  handleStartRecord = console.log
  handleFinishRecord = console.log


  render() {
    return (
      <div className="app">
        <div className="recorder">
          <video ref={this.recorder} />
        </div>
      </div>
    );
  }
}

export default App;
