import React from 'react';
///import PropTypes from 'prop-types';
import Button from './Button';
import ReactDOM from  'react-dom';
import connect from 'react-redux/es/connect/connect';
import { seats, transactionModal} from '../actions';

class Modal extends React.Component {
  constructor() {
    super();
  }

  render() {
    // Render nothing if the msg prop is empty
    if (!this.props.activeTransactionModal) {
      return null; 
    }
    //Use of createPortal to render the modal inside the document body (to prevent z-index problems)
    return (
      ReactDOM.createPortal(
        <div className='bg-modal' onClick={this.props.onCloseModal}>
          <div className='modal-content'>
            <p>{this.props.activeTransactionModal}</p>
            <Button handleClick={this.props.onCloseModal}>
              Close
            </Button>
          </div>
        </div>,
        document.getElementById('modal-root') )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeTransactionModal: state.activeTransactionModal,
  }
};

function mapDispatchToProps(dispatch) {
  return {
    onCloseModal : (data) => {
      dispatch(seats(null));
      dispatch(transactionModal(null));
    },
  };
}

//Connects the Modal component to the Redux store.
export default connect(mapStateToProps, mapDispatchToProps)(Modal);


