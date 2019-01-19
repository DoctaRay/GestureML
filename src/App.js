import React, { Component, createRef } from 'react';
import Button from '@material-ui/core/Button';
import Webcam from 'react-webcam';
import Countdown from 'react-countdown-now';
import { Animated } from 'react-animated-css';
import { Grid, Row, Col } from 'react-bootstrap'

import RandObject from './RandObject';
import { Bucket } from './firebase';

import ModalEx from './Components/Modal.js'

import TitleIm from './icon-left-font.png';

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

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const objects = ["heart", "tree", "gun", "dog"];

let some;
let check;


class App extends Component {
  /** @type {Bucket} */
  bucket;

  constructor(props) {
    super(props);
    this.bucket = new Bucket();
    this.webcam = createRef();
    this.state = {
      object: objects[parseInt(Math.random() * objects.length)],
      show: false,
      countdowner: false,
      worldTimer: 3,
    };
    check = (this.state.worldTimer == 0) ? true : false;
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



  takePicture = async () => {
    const image = this.webcam.current.getScreenshot();
    const blob = image.substring(image.indexOf(',')+1);
    //const imageSrc = this.webcam.getScreenshot();

    try {
      const snapshot = await this.bucket.upload(blob, this.state.object);
      console.log(`Upload successful: ${snapshot.state}`);
    } catch (error) {
      console.error(`Something went wrong: ${JSON.stringify(error)}`);
    }
  }

  countDown = () => {
    if (this.state.worldTimer == 0) {
      this.setState({
        show: false,
      })
    } else {
    this.setState({
      worldTimer: this.state.worldTimer - 1,
    })
  }
  }

  start = () => {
    this.setState({
    object: objects[parseInt(Math.random() * objects.length)],
    show: true,
    countdowner: true,
  })

    some = setInterval(this.countDown, 1000);

  };





  render() {
    let player;
    let countdown;
    let become;
    let starter;
    if (this.state.show == true) {
      player =
        <Webcam
          audio={false}
          height={285}
          ref={this.webcam}
          screenshotFormat="image/jpeg"
          width={500}
          videoConstraints={videoConstraints}
        />;
        countdown =
          <p> Take a picture within {this.state.worldTimer} seconds! </p>;
        become = <h2>Become a ... {this.state.object}</h2>;
    }
    else if (this.state.show == false){
      player = <p></p>;
      countdown = <p></p>;
      become = <p></p>;
    }

    if (this.state.worldTimer == 0) {
      this.takePicture();
      clearInterval(some);
    }



    return (
      <div className="app">
        <Grid>
          <Row>
            <Col>
          <ModalEx />
          </Col>
          <Col>
          </Col>
          <Col>
          </Col>
          </Row>
        </Grid>
        {/* <img src={TitleIm} className="image" height="50%" width="100%" /> */}
        <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
          <h1 className='title'>Quick Reakt</h1>
        </Animated>
        <div className="player">
          {player}
        </div>
        {countdown}
        <h3 className='explanation'>An AI-powered cherades game! Created at UofT Hacks VI!</h3>
        {become}
        <Button variant='contained' color='primary' onClick={this.start}>Start game</Button>
        {/* <video id="recorder" className="video-js vjs-default-skin" /> */}
      </div>
    );
  }
}

export default App;
