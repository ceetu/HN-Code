import React from 'react'
import SelectSeat from './SelectSeat'
import {detailsModal, helloAction, seats, transactionModal} from '../actions';
import connect from 'react/es/connect/connect';
import Button from './Button';
import { /*getMovies,*/ transaction} from '../helpers';

class CardList extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    debugger;
    this.props.onRequestMovies();
    //getMovies(this.props.dispatch);//we add movies to the store
  }

  render() {
    debugger;
    return this.props.movies.map( (item, i) => {
      let button;
      if (!item.booked) {
        button = <Button className="button" handleClick={() => {
          this.props.onOpenSeatModal(i)
        }}>Buy seat</Button>
      } else {
        button = <div><i className="fas fa-loveseat"></i>BOOKED!</div>
      }

      return (
        <div key={i} className="item">
          <div className="card">
            <div className="img" onClick={() => { this.props.onOpenDetails(item) }} style={{ backgroundImage: 'url(images/' + item.image + ')' }}></div>
            <article>
              <h1 className="movie-title">{item.title}</h1>
              {button}
            </article>
            <SelectSeat
              show={i == this.props.activeSeatModal}
              handleClose={this.props.onCloseSeat}
              handleBuy={this.props.handleBuy}
              item={item}
            />
          </div>
        </div>
      );
    });

  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.sagaMoviesReducer,
    activeSeatModal: state.activeSeatModal,
  }
};


function mapDispatchToProps(dispatch) {
  return {
    onOpenDetails : (data) => {
      dispatch(helloAction('Felix'));
      dispatch(detailsModal(data));
    },
    onOpenSeatModal : (i) => {
      dispatch(seats(i));
    },
    onCloseSeat : () => {
      dispatch(seats(null));
      dispatch(transactionModal(null));
    },
    handleBuy : (data) => {
      //transaction(dispatch, data);
      dispatch({ type: 'BOOK_A_MOVIE', data });
    },
    onRequestMovies : () => dispatch({ type: 'MOVIES_FETCH_REQUESTED' }),
    dispatch,
  };
}

//Connects the App component to the Redux store.
export default connect(mapStateToProps, mapDispatchToProps)(CardList);
