import types from '../actions/types';

const initialState = {
  isLogged: false,
  token: null,
  spotifyAuthorization: null
}

export default(state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    default:
      return state;
  }
}