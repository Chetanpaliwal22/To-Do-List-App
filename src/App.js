import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Main from './components/Main/Main';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import './App.css';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/To-Do-List-App' component={Main} />
            <Route exact path='/' component={Main} />
            <Route exact path='/To-Do-List-App/home' component={Main} />
            <Route exact path='/To-Do-List-App/completed-task' component={Main} />
            <Redirect to="/To-Do-List-App/home" />
          </Switch>
        </div>
      </BrowserRouter>
    )
  };
}

export default App;