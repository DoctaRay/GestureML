import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import Button from '@material-ui/core/Button';
import '../App.css';

class ModalEx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false
        }
    }

    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    render() {
        return (
            <section>
                <Button variant='contained' color='purple' onClick={() => this.openModal()} >Help</Button>
                {/* <input type="button" value="Open" onClick={() => this.openModal()} /> */}
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className='modal'>
                        <h1 style={{textAlign: "center"}}>What is Quick Reakt?</h1>
                        <p style={{textAlign: "center"}}>An AI-powered game which recognizes gestures you make! Become an object of some sort and see if our neural network thinks its good or not!</p>
                        {/* <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a> */}
                    </div>
                </Modal>
            </section>
        );
    }
}

export default ModalEx;
