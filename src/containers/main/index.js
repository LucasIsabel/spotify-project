import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

class Main extends Component {

  state = {}

  render() {
    return (
      <Fragment>
        <div>
          Hello World
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({spotify}) => ({spotify})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...stepperActions
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);