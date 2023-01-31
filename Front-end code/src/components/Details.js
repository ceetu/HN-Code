import React from 'react';
import Close from '../cancel-button.svg';
import { connect } from 'react-redux';
import { detailsModal } from '../actions';
class Details extends React.Component {
  constructor() {
    super();
  }

  render() {

    if (!this.props.data) {
      return null;
    }
    const data = this.props.data;
    const imgLarge = data.image.split('.')[0] + '_big.jpg';

    //Functional Component (with destructuring of props)
    const Info = ({name, value}) => (
      <div className="movie-info">
        <div className="name">{name}</div>
        <div className="value">{value}</div>
      </div>
    );

    return (
      <div className='bg-modal' onClick={this.props.onCloseDetails}>
        <div className='detail-content' onClick={ proxy => proxy.stopPropagation()}>
          <Close className="close-btn" width={40} height={40} onClick={this.props.onCloseDetails} />
          <img src={'images/'+imgLarge} className='img-details' />
          <div className='detail-list'>
            <h1>{data.title}</h1>
            <p>{this.props.hello}</p>
            <Info name='Genre' value={data.genre}/>
            <Info name='Director' value={data.director}/>
            <Info name='Stars' value={data.stars}/>
            <Info name='Plot' value={data.plot}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hello: state.helloReducer,
    data: state.detailsModalReducer,
  }
};

function mapDispatchToProps(dispatch) {
  return {
    onCloseDetails : (e, data) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(detailsModal(null));
    },
  };
}

//Connects the App component to the Redux store.
export default connect(mapStateToProps, mapDispatchToProps)(Details);
