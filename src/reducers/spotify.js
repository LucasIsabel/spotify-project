import types from '../actions/types';

const initialState = {
  artists: []
}

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case `${types.SEARCH_ARTIST}_FULFILLED`:
      {
        return {
          ...initialState,
          artists: payload
        }
      }
    default:
      return state;
  }
}