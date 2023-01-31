import { combineReducers } from 'redux'

const activeSeatModal = (state = null, action) => {
  switch (action.type) {
    case 'OPEN_SEAT_MODAL':
      return action.id
    default:
      return state
  }
}

const activeTransactionModal = (state = null, action) => {
  switch (action.type) {
    case 'OPEN_TRANSACTION_MODAL':
      return action.message
    default:
      return state
  }
}

const detailsModalReducer = (state = null, action) => {
  switch (action.type) {
    case 'OPEN_DETAILS_MODAL':
      return action.data
    default:
      return state
  }
}

const sagaMoviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'MOVIES_FETCH_SUCCEEDED':
      return action.movies
    case 'MOVIES_FETCH_FAILED':
      return action.message
    case 'BOOK_MOVIE':
      debugger;
      const _state =  Object.assign([], state);
      _state[action.id].booked = true;
      return _state;  
    default:
      return state
  }
}

const helloReducer = (state = 'Hello man!', action) => {
  switch (action.type) {
    case 'SAY_HELLO':
      return 'Hello ' + action.name
    default:
      return state
  }
}

export default combineReducers({
  detailsModalReducer,
  activeSeatModal,
  activeTransactionModal,
  helloReducer,
  sagaMoviesReducer,
})
