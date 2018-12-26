import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as spotifyActions from '../../actions/spotifyAction';
import {withRouter} from 'react-router-dom';
import Card from '../../components/cards'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import {hasToken,removeTokenAndRedirect} from '../../helpers/functions';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
  root: {
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
      this.props.actions.searchArtist(params.name);
    }
    if (this.props.spotify.authError) removeTokenAndRedirect()
  }

  componentDidMount() {
    const {params} = this.props.match;  
    this
      .props
      .actions
      .searchArtist(params.name);
  }

  getAlbunsListFromId = (id) => {
    const { 
      artistsAlbuns
     } = this.props.spotify;

     let albuns = artistsAlbuns.filter((album) => {
      return (album.artists.some((artist) => artist.id === id)) 
     })
     
     return albuns;
  }

  handleClick = state => () => {
    this.setState({ open: true, ...state });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
            .artists
            .map((value) => {
              return <Grid key={value.id} item xs={12} sm={6} md={4}>
                <Paper className={classes.paper}>
                  <Card
                    artistId={value.id}
                    name={value.name}
                    image={value.images[0]}
                    genres={value.genres}
                    popularity={value.popularity}
                    filteralbums={this.getAlbunsListFromId}
                    getAlbunsById={this.props.actions.getAlbunsById}
                  />
                </Paper>
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
