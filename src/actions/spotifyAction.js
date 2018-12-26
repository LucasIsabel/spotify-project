import types from './types';
import ServiceFactory from '../api/factories/service/service';

const service = ServiceFactory.create();

const searchArtist = (name) => {
  return dispatch => {
    return dispatch({
      type: types.SEARCH_ARTIST,
      payload: service.searchArtist(name)
    })
  }
}

const updateLogin = () => {
  return {
    type: types.USER_LOGGED,
    payload: true
  }
}

export {searchArtist, updateLogin}