import React, {Component, Fragment} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as spotifyActions from '../../actions/spotifyAction';

class Main extends Component {

  state = {}

  componentDidMount(){
    this.props.actions.searchArtist('Lucas');
  }

  render() {
    return (
      <Fragment>
        <div>
          {
            this.props.spotify.artists.map((value, key) => {
              return <div key={key}>{value.name}</div>
            })
          }
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({spotify, auth}) => ({spotify, auth})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...spotifyActions
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);