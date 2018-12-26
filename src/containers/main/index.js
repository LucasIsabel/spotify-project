import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as spotifyActions from '../../actions/spotifyAction';
import {handleAuthentatication} from '../../helpers/functions';
import {redirectIfNotLogged} from '../../helpers/functions';

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
    const { isAuthorized } = this.props.spotify;
    return (
      <section>
        <div>
          {isAuthorized ? <div> What are you looing for </div> : <div> Please loggin </div>  } 
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));