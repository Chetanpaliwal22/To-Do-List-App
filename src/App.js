import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/LoginComponent';
import Signup from './components/SignupComponent';
import MainComponent from './components/MainComponent';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={MainComponent} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={Signup} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  };
}

export default App;