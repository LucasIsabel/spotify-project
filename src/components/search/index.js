import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';

const styles = () => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'absolute',
    paddingRight: 50,
    paddingLeft: 50
  },
  selectStyle: {
    width: '80%',
    height: 30,
  },
  inputStyle: {
    width: '100%',
    height: 30
  },
  gridRoot:{
    height: 'auto'
  },
  gridContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  bottomStyle: {
    width: '80%',
    cursor: 'pointer',
    height: '100%'
  }  
});

class SearchBar extends Component {

  state = {
    select: null,
    search: null
  }

  optionHandler = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  onHandleClick = () => {
    this.props.history.push(`/${this.state.select}/${this.state.search}`);
  }

  render() {

    const {classes} = this.props;

    return (

        <section className={classes.root}>
          <Grid container direction="row" className={classes.gridRoot}>

            <Grid item xs={12} md={2} className={classes.gridContainer}>
              <select name="select" className={classes.selectStyle} onChange={(event) => this.optionHandler(event)}>
                <option value=""> &nbsp; </option>
                <option value="artist">Artist</option>
                <option value="Album">Album</option>
                <option value="Track">Track</option>
              </select>
            </Grid>
            <Grid item xs={12} md={8} className={classes.gridContainer}>
              <input name="search" className={classes.inputStyle} onChange={(event) => this.optionHandler(event)} />
            </Grid>
            <Grid item xs={12} md={2} className={classes.gridContainer}>
              <button className={classes.bottomStyle} onClick={this.onHandleClick}>
                Search
              </button>
            </Grid>

          </Grid>
        </section>

    )
  }
}

export default withStyles(styles)(withRouter(SearchBar));