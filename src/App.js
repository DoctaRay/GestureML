import React, { Component, createRef } from 'react';
import Button from '@material-ui/core/Button';
import Webcam from 'react-webcam';
import Countdown from 'react-countdown-now';
import { Animated } from 'react-animated-css';

import RandObject from './RandObject';
import { Bucket } from './firebase';
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

const objects = ["heart", "tree", "gun", "dog"];


class App extends Component {
  /** @type {Bucket} */
  bucket;
  
  constructor(props) {
    super(props);
    this.bucket = new Bucket();
    this.webcam = createRef();
    this.state = {
      object:objects[parseInt(Math.random() * objects.length)]
    };
  }
  // componentDidMount() {
  //   const { videojs } = window;
  //   this.player = videojs('recorder', options);
  //
  //   // error handling
  //   this.player.on('deviceError', function() {
  //     console.warn('device error:', this.player.deviceErrorCode);
  //   });
  //   this.player.on('error', function(error) {
  //     console.log('error:', error);
  //   });
  //   // user clicked the record button and started recording
  //   this.player.on('startRecord', this.handleStart);
  //   // user completed recording and stream is available
  //   this.player.on('finishRecord', this.handleFinish);
  // }
  //
  // handleStart = console.log;
  // handleFinish = console.log;
  //
  // componentWillUnmount() {
  //   const { player } = this;
  //   if (player) player.dispose();
  // }

  start = async () => {
    const image = this.webcam.current.getScreenshot();
    const blob = image.substring(image.indexOf(',')+1);

    try {
      const snapshot = await this.bucket.upload(blob, this.state.object);
      console.log(`Upload successful: ${snapshot.state}`);
    } catch (error) {
      console.error(`Something went wrong: ${JSON.stringify(error)}`);
    }

    this.setState({
      object: objects[parseInt(Math.random() * objects.length)]
    })
  }

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    return (
      <div className="app">
        {/* <img src={TitleIm} className="image" height="50%" width="100%" /> */}
        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
          <h1 className='title'>Quick Reakt</h1>
        </Animated>
        <Webcam
          audio={false}
          width={1280}
          height={720}
          ref={this.webcam}
          videoConstraints={videoConstraints}
          style={{ width: 888, height: 500 }}
        />
        <Countdown date={Date.now() + 10000} />
        <Button variant='contained' color='primary' onClick={this.start}>Start game</Button>
        <h2>Become a ... {this.state.object}</h2>
        {/* <video id="recorder" className="video-js vjs-default-skin" /> */}
      </div>
    );
  }
}

export default App;
