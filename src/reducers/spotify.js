import types from '../actions/types';
import {updateState} from '../helpers/functions';

const favoriteArtists = localStorage.getItem('favoriteArtist') ? JSON.parse(localStorage.getItem('favoriteArtist')) : []

const initialState = {
  artists: [],
  albums: [],
  tracks: [],
  artistsAlbuns:[],
  trackingAlbums:[],
  isAuthorized: false,
  authError: false,
  favoriteArtists,
  loader: false
}

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case `${types.SEARCH_ARTIST}_FULFILLED`:
      {
        return updateState(state, {artists: payload.data.artists.items, loader: false});
      }
    case `${types.SEARCH_ARTIST}_PENDING`:
      {
        return updateState(state, {loader: true});
      }
    case `${types.SEARCH_ALBUMNS}_FULFILLED`:
      {
        return updateState(state, {albums: payload.data.albums.items, loader: false});
      }
      case `${types.SEARCH_ALBUMNS}_PENDING`:
      {
        return updateState(state, {loader: true});
      }
    case `${types.SEARCH_TRACKS}_FULFILLED`:
      {
        return updateState(state, {tracks: payload.data.tracks.items, loader: false});
      }
    case `${types.SEARCH_TRACKS}_PENDING`:
      {
        return updateState(state, {loader: true});
      } 
    case `${types.USER_LOGGED}`:
      {
        return updateState(state, {isAuthorized: payload});
      }
    case `${types.SEARCH_ARTIST}_REJECTED`: {
      return updateState(state, {authError: true})
      }
    case `${types.SEARCH_ALBUMNS}_REJECTED`: {
        return updateState(state, {authError: true})
      }
    case `${types.SEARCH_TRACKS}_REJECTED`: {
        return updateState(state, {authError: true})
      }
    case `${types.ALBUMNS_BY_ID}_FULFILLED`:
      {
        return updateState(state, {artistsAlbuns: [...state.artistsAlbuns, ...payload.data.items], loader: false})
      }
      case `${types.ALBUMNS_BY_ID}_PENDING`:
      {
        return updateState(state, {loader: true});
      }  
    case `${types.TRACKS_BY_ID}_FULFILLED`:
      {
        return updateState(state, {trackingAlbums: [...state.trackingAlbums, { albumId: payload.data.id, tracks: [...payload.data.tracks.items] }], loader: false})
      }
    case `${types.TRACKS_BY_ID}_PENDING`:
      {
        return updateState(state, {loader: true});
      }
    case `${types.SET_FAVORITE}`:
      {
        return updateState(state, {favoriteArtists: payload})
      }      
    default:
      return state;
  }
}