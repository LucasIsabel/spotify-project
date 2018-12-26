import types from '../actions/types';
import {updateState} from '../helpers/functions';

const favoriteArtists = localStorage.getItem('favoriteArtist') ? JSON.parse(localStorage.getItem('favoriteArtist')) : []

const initialState = {
  artists: [],
  artistsAlbuns:[],
  isAuthorized: false,
  authError: false,
  favoriteArtists
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
    case `${types.ALBUMNS_BY_ID}_FULFILLED`:
      {
        return updateState(state, {artistsAlbuns: [...state.artistsAlbuns, ...payload.data.items]})
      }
    case `${types.SET_FAVORITE}`:
      {
        return updateState(state, {favoriteArtists: payload})
      }      
    default:
      return state;
  }
}