import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {withRouter} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import {connect} from 'react-redux';

const styles = () => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'absolute',
    paddingRight: 50,
    paddingLeft: 50,
    background: '#4682B4',
  },
  selectStyle: {
    width: '80%',
    height: 30,
    backgroundColor: '#fff',
    paddingLeft: 10,
    fontSize: 16,
    outline: 'none'
  },
  inputStyle: {
    width: '100%',
    height: 30,
    backgroundColor: '#fff',
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 500,
    textTransform: 'capitalize',
    outline: 'none'
  },
  gridRoot: {
    height: 'auto'
  },
  gridContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'sanserif'
  },
  bottomStyle: {
    width: '80%',
    cursor: 'pointer',
    height: '100%',
    border: 'none',
    color: '#fff',
    backgroundColor: '#00BFFF'
  },
  rootLoader: {
    flexGrow: 1,
  },
});

class SearchBar extends Component {

  state = {
    select: null,
    search: null,
    errorInput: false
  }

  optionHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onHandleClick = () => {
    if (this.state.search === '' || !this.state.search || this.state.select === '' || !this.state.select) {
      this.setState({ errorInput: true})
      return
    }
    this.setState({ errorInput: false})
    this
      .props
      .history
      .push(`/${this.state.select}/${this.state.search}`);
  }

  render() {

    const {classes} = this.props;
    const { loader } = this.props.spotify;

    return (

      <Fragment>
      {loader ? <LinearProgress /> : null}
      <section className={classes.root}>
        <Grid container direction="row" className={classes.gridRoot}>

          <Grid item xs={12} md={2} className={classes.gridContainer}>
            <select
              name="select"
              className={classes.selectStyle}
              onChange={(event) => this.optionHandler(event)}>
              <option value="">
                &nbsp;
              </option>
              <option value="artist">Artist</option>
              <option value="albums">Album</option>
              <option value="tracks">Track</option>
            </select>
          </Grid>
          <Grid item xs={12} md={8} className={classes.gridContainer}>
            <input
              name="search"
              className={classes.inputStyle}
              onChange={(event) => this.optionHandler(event)}
              placeholder={"Kendrick Lamar"}
              />
          </Grid>
          <Grid item xs={12} md={2} className={classes.gridContainer}>
            <button className={classes.bottomStyle} onClick={this.onHandleClick}>
              Buscar
            </button>
          </Grid>

        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={this.state.errorInput}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id"> Selecione uma opção, e preencha o campo de busca para continuar... </span>}
          />
      </section>
          </Fragment>

    )
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
  spotify: PropTypes.object.isRequired
};

const mapStateToProps = ({spotify}) => ({spotify})

export default connect(mapStateToProps, null)(withStyles(styles)(withRouter(SearchBar)));