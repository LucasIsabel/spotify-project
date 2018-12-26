import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '40%'
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '60%',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

class CardTrack extends React.Component {

    storeFavoriteArtist = (id) => {
        const storaged = localStorage.getItem("favoriteArtist");
        if (!storaged) {
          localStorage.setItem('favoriteArtist', JSON.stringify([{id}]));
          this.props.setFavorite(JSON.parse(localStorage.getItem("favoriteArtist")));
        } else {
          let favArtist = JSON.parse(storaged);
          if (!favArtist.some((artist) => artist.id === id)) {
            favArtist = [...favArtist, {id}]
            localStorage.setItem('favoriteArtist', JSON.stringify(favArtist));
            this.props.setFavorite(favArtist);
          } else {
            favArtist = favArtist.filter(fav => fav.id !== id);
            localStorage.setItem('favoriteArtist', JSON.stringify(favArtist));
            this.props.setFavorite(favArtist);
          }
        }
      }

  render(){
    
    const { classes } = this.props;
    const isFavorite = this.props.isFavorite(this.props.trackId);
    console.log('Props Tracks', this.props)

    return (
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {this.props.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
              { 
                this.props.artists.map((artist) => artist.name).toString()
              }
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
              { 
                `Album : ${this.props.album}`
              }
              </Typography>
            </CardContent>
            <div className={classes.controls}>
            <IconButton aria-label="Add to favorites" onClick={() => this.storeFavoriteArtist(this.props.trackId)}>
                {isFavorite ? <FavoriteIcon color={"error"} /> : <FavoriteIcon /> } 
            </IconButton>
            </div>
          </div>
          <CardMedia
            className={classes.cover}
            image={this.props.image.url}
            title="Live from space album cover"
          />
        </Card>
      );
  }
}

CardTrack.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CardTrack);
