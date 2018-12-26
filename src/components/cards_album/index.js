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
  },
  colapseContent: {
    height: 200,
    overflowY: 'auto'
  }
});

class RecipeReviewCard extends React.Component {
  state = { expanded: false };

  componentDidMount(){
    this.props.getTrackById(this.props.albumId);
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

  render() {

    const { classes } = this.props;
    const tracks = this.props.getTracks(this.props.albumId);
    const isFavorite = this.props.isFavorite(this.props.albumId);

    console.log(tracks);

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
            { 
              this.props.artists.map((artist) => artist.name).toString()
            }
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites" onClick={() => this.storeFavoriteArtist(this.props.albumId)}>
            {isFavorite ? <FavoriteIcon color={"error"} /> : <FavoriteIcon /> } 
          </IconButton>
          
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
        <CardContent className={classes.colapseContent}>
            <Typography paragraph>Tracks:</Typography>
            <List component="nav" className={classes.listRoot}>
            {
              tracks.map((value) => {
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

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);