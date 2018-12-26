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

const searchAlbumns = (name) => {
  return dispatch => {
    return dispatch({
      type: types.SEARCH_ALBUMNS,
      payload: service.searchAlbums(name)
    })
  }
}

const searchTracks = (name) => {
  return dispatch => {
    return dispatch({
      type: types.SEARCH_TRACKS,
      payload: service.searchTracks(name)
    })
  }
}

const updateLogin = () => {
  return {
    type: types.USER_LOGGED,
    payload: true
  }
}

const getAlbunsById = (id) => {
  return dispatch => {
    return dispatch ({
      type: types.ALBUMNS_BY_ID,
      payload: service.searchAlbumsById(id)
    })
  }
}

const getTrackById = (id) => {
  return dispatch => {
    return dispatch({    
      type: types.TRACKS_BY_ID,
      payload: service.searchTracking(id)
    })
  }
}

const setFavoriteItem = (list) => {
  return {
    type: types.SET_FAVORITE,
    payload: list
  }
}

export {searchArtist, updateLogin, getAlbunsById, setFavoriteItem, searchAlbumns, getTrackById, searchTracks} 