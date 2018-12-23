import {combineReducers} from 'redux';
import spotify from './spotify';
import auth from './auth';

export default combineReducers({spotify, auth})