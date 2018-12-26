import spotifyReducer from '../../../src/reducers/spotify';
import types from '../../../src/actions/types';
import ArtistsMock from '../../../src/fixtures/artists-mock';
import AlbumsMock from '../../../src/fixtures/albums-mock';
import TrackMock from '../../../src/fixtures/tracks-mock';
import ArtistsAlbums from '../../../src/fixtures/artists-albums-mock';
import trackingAlbumsMock from '../../../src/fixtures/tracking-mock';
import Favorite from '../../../src/fixtures/favorite-mock';

describe('Spotify Reducer', () => {

  let state;

  beforeAll(() => {
    state = {
      artists: [],
      albums: [],
      tracks: [],
      artistsAlbuns: [],
      trackingAlbums: [],
      isAuthorized: false,
      authError: false,
      loader: false,
      favoriteArtists: []
    }
  })

  it('should update propertie artist from state', () => {
    const result = spotifyReducer(state, {
      type: `${types.SEARCH_ARTIST}_FULFILLED`,
      payload: ArtistsMock
    })
    expect(result.artists.length).toBeGreaterThan(0)
    expect(result.loader).not.toBeTruthy()
  })

  it('should update propertie loader to true', () => {
    const result = spotifyReducer(state, {
      type: `${types.SEARCH_ARTIST}_PENDING`,
      payload: true
    })
    expect(result.loader).toBeTruthy()
  })

  it('should update propertie albums from state', () => {
    const result = spotifyReducer(state, {
      type: `${types.SEARCH_ALBUMNS}_FULFILLED`,
      payload: AlbumsMock
    })
 
    expect(result.albums.length).toBe(2)
    expect(result.loader).not.toBeTruthy()
  })

  
  it('should update propertie loader to true', () => {
    const result = spotifyReducer(state, {
      type: `${types.SEARCH_ALBUMNS}_PENDING`,
      payload: true
    })
    expect(result.loader).toBeTruthy()
  })


  it('should update propertie tracks from state', () => {
    const result = spotifyReducer(state, {
      type: `${types.SEARCH_TRACKS}_FULFILLED`,
      payload: TrackMock
    })
 
    expect(result.tracks.length).toBe(1)
    expect(result.loader).not.toBeTruthy()
  })

  it('should update propertie loader to true', () => {
    const result = spotifyReducer(state, {
      type: `${types.SEARCH_TRACKS}_PENDING`,
      payload: true
    })
    expect(result.loader).toBeTruthy()
  })

  it('should update propertie isAuthorized to true', () => {
    const result = spotifyReducer(state, {
      type: `${types.USER_LOGGED}`,
      payload: true
    })
    expect(result.isAuthorized).toBeTruthy()
  })

  it('should update propertie authError to true', () => {
    const result = spotifyReducer(state, {
      type: `${types.SEARCH_ARTIST}_REJECTED`,
      payload: true
    })
 
    expect(result.authError).toBeTruthy()
  })

  it('should update propertie authError to true', () => {
    const result = spotifyReducer(state, {
      type: `${types.SEARCH_ALBUMNS}_REJECTED`,
      payload: true
    })
 
    expect(result.authError).toBeTruthy()
  })

  it('should update propertie authError to true', () => {
    const result = spotifyReducer(state, {
      type: `${types.SEARCH_TRACKS}_REJECTED`,
      payload: true
    })
 
    expect(result.authError).toBeTruthy()
  })

  it('should update propertie artistsAlbuns from state', () => {
    const result = spotifyReducer(state, {
      type: `${types.ALBUMNS_BY_ID}_FULFILLED`,
      payload: ArtistsAlbums
    })
 
    expect(result.artistsAlbuns.length).toBe(1)
    expect(result.loader).not.toBeTruthy()
  })

  it('should update propertie loader to true', () => {
    const result = spotifyReducer(state, {
      type: `${types.ALBUMNS_BY_ID}_PENDING`,
      payload: true
    })
    expect(result.loader).toBeTruthy()
  })

  it('should update propertie trackingAlbums from state', () => {
    const result = spotifyReducer(state, {
      type: `${types.TRACKS_BY_ID}_FULFILLED`,
      payload: trackingAlbumsMock
    })
 
    expect(result.trackingAlbums.length).toBe(1)
    expect(result.loader).not.toBeTruthy()
  })

  it('should update propertie loader to true', () => {
    const result = spotifyReducer(state, {
      type: `${types.TRACKS_BY_ID}_PENDING`,
      payload: true
    })
    expect(result.loader).toBeTruthy()
  })

  it('should update propertie loader to true', () => {
    const result = spotifyReducer(state, {
      type: `${types.SET_FAVORITE}`,
      payload: Favorite
    })
    expect(result.favoriteArtists.length).toBeGreaterThan(0)
  })

})