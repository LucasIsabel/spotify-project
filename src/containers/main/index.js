import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as spotifyActions from '../../actions/spotifyAction';
import {handleAuthentatication} from '../../helpers/functions';
import {redirectIfNotLogged} from '../../helpers/functions';
import {withStyles} from '@material-ui/core/styles';

const style = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: '100%'
  },
  welcome: {
    fontSize: 50
  }
}

class Main extends Component {

  state = {}

  componentDidMount(){
    const { match, location } = this.props;
    const token = localStorage.getItem('secure_token');
    if (!token) {
      handleAuthentatication(match, location);
    }
    redirectIfNotLogged(); 
  }

  render() {
    const { classes } = this.props;
    return (
      <section className={classes.root}>
        <div className={classes.welcome}>
           Comece sua busca.... :)
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(style)(Main)));