import React from 'react';
import './App.css';
import Welcome from './Welcome'
import Landing from './Landing'
import ShowAllCars from './ShowAllCars'
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
                <Landing type="/form" title = "Your car is stolen !!" details="Don't worry, register your details here"/>
              </Grid>
              <Grid item xs={12} sm={6} lg={4} xl={3}>
                <Landing type="/showall" title = "Want to know your car status" details="Don't worry, click below to see details"/>
              </Grid>
            </Grid>
          </Route>
          <Route path="/form">
            <Formview />
          </Route>
          <Route path="/showall">
            <ShowAllCars />
          </Route>
        </Switch>
      </Router>
    )
  };
}

export default App;
