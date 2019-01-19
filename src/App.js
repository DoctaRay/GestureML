import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Webcam from 'react-webcam';

// import logo from './logo.svg';
import './App.css';

const options = {
  controls: true,
  width: 320 * 2,
  height: 240 * 2,
  fluid: false,
  controlBar: {
    volumePanel: false
  },
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
  componentDidMount() {
    const { videojs } = window;
    this.player = videojs('recorder', options);

    // error handling
    this.player.on('deviceError', function() {
      console.warn('device error:', this.player.deviceErrorCode);
    });
    this.player.on('error', function(error) {
      console.log('error:', error);
    });
    // user clicked the record button and started recording
    this.player.on('startRecord', this.handleStart);
    // user completed recording and stream is available
    this.player.on('finishRecord', this.handleFinish);
  }

  handleStart = console.log;
  handleFinish = console.log;

  componentWillUnmount() {
    const { player } = this;
    if (player) player.dispose();
  }

  setRef = webcam => {
    this.webcam = webcam;
  };
  //
  // capture = () => {
  //   console.log
  //   const imageSrc = this.webcam.getScreenshot();
  // };
  capture = console.log;

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    return (
      <div className="app">
        <h1>title</h1>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
        />
        <button onClick={this.capture}>Capture photo</button>
        <video id="recorder" className="video-js vjs-default-skin" />
        <Button variant="contained" color="primary">
          Take a picture!
        </Button>
      </div>
    );
  }
}

export default App;
