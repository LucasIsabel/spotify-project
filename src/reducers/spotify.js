import types from '../actions/types';
import {updateState} from '../helpers/functions';

const initialState = {
  artists: [],
  isAuthorized: false,
  authError: false
}

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case `${types.SEARCH_ARTIST}_FULFILLED`:
      {
        return updateState(state, {artists: payload.data.artists.items});
      }
    case `${types.USER_LOGGED}`:
      {
        return updateState(state, {isAuthorized: payload});
      }
    case `${types.SEARCH_ARTIST}_REJECTED`: {
      return updateState(state, {authError: true})
    }  
    default:
      return state;
  }
}