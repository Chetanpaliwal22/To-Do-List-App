import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Main from './components/Main/Main';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import './App.css';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/home' component={Main} />
            <Route exact path='/completed-task' component={Main} />
            <Route path="/sign-in" component={Signin} />
            <Route path="/sign-up" component={Signup} />
            <Redirect to="/home" />
          </Switch>
        </div>
      </BrowserRouter>
    )
  };
}

export default App;