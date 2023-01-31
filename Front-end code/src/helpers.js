
import fetch from 'isomorphic-fetch';
import {/* seats, */ transactionModal, /*updateMoviesAction,*/  bookMovieAction } from './actions'
const url = 'http://localhost:3001';


export const getUserId = () => {
  return 'he6fe54u4s56o71d36z51no';
}

/*export const getMovies = (dispatch, id = '') => {

  fetch(url + '/movies/' + id)
    .then(function (resp) { return resp.json(); })
    .then(function (data) {
      //We add a booked property, it will tell us if the movie has been booked
      //if so we'll add an icon "booked" and remove the "buy seat" button"
      const movies = data.map((elem) => {
        elem.booked = false;
        return elem;
      });

      //check the transaction's list and maj the movies already booked by the user
      fetch(url + '/transactions')
        .then(function (resp) { return resp.json(); })
        .then(function (data) {

          const bookedMovies = data.filter(elem => elem.userId == getUserId());

          //normaly we should do that server side but we don't have real server here
          for (let i=0;i<movies.length;i++) {
            for (let j=0;j<bookedMovies.length;j++) {
              if ( movies[i].id == bookedMovies[j].movieId ) {
                movies[i].booked = true;
              }
            };
          };

          //todo: we can save the movie schedule and set booked to false when the date is exceeded
          //create a real server with nodejs and express + a sign in / login system
          dispatch(updateMoviesAction(movies));
        })

    })
    .catch(function(error) {
      if ( dispatch ) {
        dispatch(transactionModal('Sorry an error occurred !'));
      }
    });
}*/

export const transaction = (dispatch, data) => {
  
  fetch(url + '/transactions', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: `{ "movieId": ${data.id}, "price": ${data.price}, "currency": "${data.currency}", "userId": "${data.userId}" }`,
  })
    .then(function (resp) { return resp.json(); })
    .then(function () {
      const msg = `Congratulations!\nYour seat for the film ${data.title} has been booked.\nPlease check your emails for more informations.`;
      debugger;
      dispatch(transactionModal(msg));
      debugger;
      dispatch(bookMovieAction(data.id-1));
    })
    .catch(function(error) {
      dispatch(transactionModal('Sorry an error occurred !'));
    });
}


