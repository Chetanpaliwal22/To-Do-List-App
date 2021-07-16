import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginComponent from './components/LoginComponent';
import MainComponent from './components/MainComponent';
import { HashRouter, Switch, Route } from "react-router-dom";
import './App.css';

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={MainComponent} />
            <Route path="/sign-in" component={LoginComponent} />
          </Switch>
        </div>
      </HashRouter>
    )
  };
}

export default App;