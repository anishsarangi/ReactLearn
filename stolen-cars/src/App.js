import React from 'react';
import './App.css';
import Welcome from './Welcome'
import Landing from './Landing'
import { Grid } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Formview from './form'

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { users: [] }
  }
  
  render() {
    return(
      <Router>
        <Welcome />
        <Switch>
          <Route exact path="/">
            <Grid container spacing = {10} style={{padding:24}} >
              <Grid item xs={12} sm={6} lg={4} xl={3}>
                <Landing />
              </Grid>
            </Grid>
          </Route>
          <Route path="/form">
            <Formview />
          </Route>
        </Switch>
      </Router>
    )
  };
}

export default App;
