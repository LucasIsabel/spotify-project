import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from './containers/main';
import Artists from './containers/artists';
import SearchBar from './components/search';
import './reset.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <SearchBar/>
          <Switch>
            <Route path="/artist/:name" component={Artists}/>
            <Route path="/" component={Main} exact/>
            <Route component={Main} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
