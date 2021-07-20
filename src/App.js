import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/home' component={Main} />
            <Route exact path='/completed-task' component={Main} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={Signup} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  };
}

export default App;