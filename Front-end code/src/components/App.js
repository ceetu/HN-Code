import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style.scss';
//import { seats, transactionModal, detailsModal /*helloAction*/} from '../actions';
import NavBar from './NavBar';
import Modal from './Modal';
import Details from './Details';
import CardList from './CardList';

class App extends Component {
  constructor(props) {
    super();
  }

  render() {
    console.log('this=', this);
    //The number of movie available in a cinema is limited (< 30) so we don't need to implement a pagination system
    return (
      <div>
        <NavBar/>
        <h1 className="title">Now Showing in Thailand</h1>
        <div className="band" >
          <CardList />
          <Modal />
          <Details />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => { return state };

//Connects the App component to the Redux store.
export default connect(mapStateToProps)(App);
