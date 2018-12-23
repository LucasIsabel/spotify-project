import {applyMiddleware, createStore, compose} from 'redux';
import rootReducers from '../reducers';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

export default (initialState = {}) => 
    createStore(
        rootReducers, 
        initialState, 
        composeEnhancers(
            applyMiddleware(
                promiseMiddleware(), 
                thunk
            )
        )
    )

