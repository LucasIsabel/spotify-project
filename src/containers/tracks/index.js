import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as spotifyActions from '../../actions/spotifyAction';
import {withRouter} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import {hasToken,removeTokenAndRedirect} from '../../helpers/functions';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '../../components/cards_Track';

const styles = theme => ({
  root: {
    paddingTop: 10,
    paddingRight: 50,
    paddingLeft: 50,
    display:'absolute'
  },
  paper: {
    margin:10,  
    textAlign: 'start',
    color: theme.palette.text.secondary
  }
});

class Main extends Component {

  state = {
    authErrorMessage: 'Erro ao validar autorização, por favor logue novamente'
  }

  componentWillMount(){
    hasToken(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const {params} = this.props.match;
      this.props.actions.searchTracks(params.name);
    }
    if (this.props.spotify.authError) removeTokenAndRedirect()
  }

  componentDidMount() {
    const {params} = this.props.match;  
    this
      .props
      .actions
      .searchTracks(params.name);
  }

  handleClick = state => () => {
    this.setState({ open: true, ...state });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  isFavorite = (id) => {
    const { favoriteArtists } = this.props.spotify;
    return favoriteArtists.some((fav) => fav.id === id)
  }

  getTracksFromId = (id) => {
    const { trackingAlbums } = this.props.spotify;
    const AlbumsTracks = trackingAlbums.find((track) => track.albumId === id);
    if (AlbumsTracks) {
      const { tracks } = AlbumsTracks;
      return tracks
    }
    return []
  }

  render() {

    const {classes} = this.props;

    return (
      <section className={classes.root}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={8}>

        {
            this
            .props
            .spotify
            .tracks
            .map((value) => {
              console.log('Tracks', value);  
              return <Grid key={value.id} item xs={12} sm={8} >
                <Card 
                     trackId={value.id}
                     name={value.name}
                     image={value.album.images[0]}
                     setFavorite={this.props.actions.setFavoriteItem}
                     isFavorite={this.isFavorite}
                     artists={value.artists}
                     album={value.album.name}
                />
              </Grid>
            })
        }
        </Grid>

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={this.props.spotify.authError}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id"> {this.state.authErrorMessage} </span>}
        />
      </section>
    )
  }
}

const mapStateToProps = ({spotify}) => ({spotify})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...spotifyActions
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Main)));
