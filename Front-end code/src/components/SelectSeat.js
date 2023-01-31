import React from 'react'
import PropTypes from 'prop-types'
import Close from '../cancel-button.svg';
import Button from './Button';
import {movieType} from './types';
import {getUserId} from '../helpers.js';

const userId = getUserId();//'he6fe54u4s56o71d36z51no';//should be defined if the user register somewhere

class SelectSeat extends React.Component {

  render() {
    if (!this.props.show) {
      return null;
    }

    //I can use object destructuring to write less code.
    const {id, title, currency, prices} = this.props.item;

    const buttons = Object.entries(prices).map((elem) => {
      console.log(elem);
      const type = elem[0];
      const price = elem[1];
      return (
        <Button key={type} handleClick={() => { this.props.handleBuy({ id, title, currency, price, userId }) }}>
          {type} seat: {price} {currency}
        </Button>
      )
    });

    return (
      <div className="seat-btn-bg" >
        <Close className="close-btn" width={40} height={40} onClick={this.props.handleClose} />
        <div className="seat-btn-container">
          {buttons}
        </div>
      </div>
    )
  }
}

SelectSeat.propTypes = {
  show: PropTypes.bool.isRequired,
  item: movieType.isRequired,//I use centralized PropTypes define in ./types/index.js (DRY principle)
  handleBuy: PropTypes.func.isRequired,
  handleClose:PropTypes.func.isRequired,
}

export default SelectSeat
