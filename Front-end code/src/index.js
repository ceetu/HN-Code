import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// create the store and mount the saga middleware on it

// dev tools middleware
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// create a redux store with our reducer above and middleware
const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware), reduxDevTools)
);
//const store = createStore(rootReducer, applyMiddleware(sagaMiddleware)/*, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/);

// then run the saga
sagaMiddleware.run(mySaga)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
