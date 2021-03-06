import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import classnames from 'classnames';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  media: {
    height: 50,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  card: {
    cursor: 'pointer'
  },
  listRoot: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
  }
});

class ArtistCard extends React.Component {
  state = { expanded: false };

  componentDidMount(){
    this.props.getAlbunsById(this.props.artistId);
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

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

  selectPopulariry = (popularity) => {
    const { color, text } = this.colorSelector(popularity);
    return <Typography style={{
      color,
      fontWeight: 900 
    }}> 
     {
       text
     }
    </Typography>
  }

  colorSelector = (popularity) => {
    if (popularity >= 80) {
      return {color: 'red', text: 'HOT'};
    } else if (popularity >= 60 && popularity <= 79) {
      return {color: 'blue', text: 'Cool'}
    } else if (popularity >= 30 && popularity <= 59) {
      return {color: '#ffbf00', text: 'Regular'}
    } else {
      return {color: 'black', text: 'Underground'}
    }
  }

  render() {

    const { classes } = this.props;
    const albums = this.props.filteralbums(this.props.artistId).slice(0, 5);
    const isFavorite = this.props.isFavorite(this.props.artistId);

    return (
      <Card className={classes.card}>
        <CardHeader
          title={this.props.name}
        />
        <CardMedia
          className={classes.media}
          image={this.props.image ? this.props.image.url : 'https://picsum.photos/200/300/?random'}
          title="Paella dish"
        />
        <CardContent>
          <Typography component="p">
            {this.props.genres.toString()}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites" onClick={() => this.storeFavoriteArtist(this.props.artistId)}>
            {isFavorite ? <FavoriteIcon color={"error"} /> : <FavoriteIcon /> } 
          </IconButton>
          {
            this.selectPopulariry(this.props.popularity)
          }
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Albums:</Typography>
            <List component="nav" className={classes.listRoot}>
            {
              albums.map((value) => {
                return <ListItem key={value.id}>
                         <ListItemText primary={value.name} />
                      </ListItem>
              })
            }
            </List>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

ArtistCard.propTypes = {
  classes: PropTypes.object.isRequired,
  filteralbums: PropTypes.func,
  isFavorite: PropTypes.func,
  getAlbunsById: PropTypes.func,
  storeFavoriteArtist: PropTypes.func
};

export default withStyles(styles)(ArtistCard);