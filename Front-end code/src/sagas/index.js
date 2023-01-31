import 'regenerator-runtime/runtime';
import {  put, takeLatest } from 'redux-saga/effects'
const url = 'http://localhost:8080';
import {transactionModal, bookMovieAction} from '../actions';
const getUserId = () => {
  return '12345';
}

function* fetchMovies(action) {
  try {
    const movies = yield fetch(url + '/movies/').then(response => response.json());
    const transactions = yield fetch(url + '/transactions/').then(response => response.json());
    const bookedMovies = transactions.filter(elem => elem.userId == getUserId());
  
    for (let i=0;i<movies.length;i++) {
      for (let j=0;j<bookedMovies.length;j++) {
        if ( movies[i].id == bookedMovies[j].movieId ) {
          movies[i].booked = true;
        }
      };
    };
    // dispatch a action to the store with the movies array
    yield put({type: 'MOVIES_FETCH_SUCCEEDED', movies});
  } catch (e) {
    yield put({type: 'MOVIES_FETCH_FAILED', message: e.message});
  }
}


function* bookMovie(action) {
  debugger;

  try {
    debugger;
    const response = yield fetch(url + '/transactions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: `{ "movieId": ${action.data.id}, "price": ${action.data.price}, "currency": "${action.data.currency}", "userId": "${action.data.userId}" }`,
    });

    const msg = `Congratulations!\nYour seat for the film ${action.data.title} has been booked.\nPlease check your emails for more informations.`;
    yield put(transactionModal(msg));
    yield put(bookMovieAction(action.data.id-1));

  } catch (e) {
    yield put(transactionModal('Sorry an error occurred !'));
  }
}
function* mySaga() {
  yield takeLatest('MOVIES_FETCH_REQUESTED', fetchMovies);
  yield takeLatest('BOOK_A_MOVIE', bookMovie);
}

export default mySaga;