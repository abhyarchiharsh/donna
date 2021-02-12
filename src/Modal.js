import React, {Component} from 'react';
import ReactModal from 'react-modal';
import Timer from './timer.js';

//Modal.setAppElement('#root');

class Modal extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
    this.props.hideTimer();
  }
  
  render () {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Start Task</button>
        <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Inline Styles Modal Example"
           style={{
              overlay: {
                backgroundColor: 'papayawhip'
              },
              content: {
                color: 'lightsteelblue'
              }
            }}
        >
          <Timer/>
          <button onClick={this.handleCloseModal}>End Task</button>
        </ReactModal>
      </div>
    );
  }
}

export default Modal;