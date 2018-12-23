import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from './containers/main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Fragment>
            <Switch>
              <Route path="/" component={Main}/>
            </Switch>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
