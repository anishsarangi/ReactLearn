import React from 'react';
import './App.css';
import Welcome from './Welcome'
import Landing from './Landing'
import { Grid } from '@material-ui/core';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { users: [] }
  }
  

  componentDidMount(){
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({users}))
  }

  render() {
    return(
      <div className="App">
        <Welcome />
        <Grid container spacing = {24} style={{padding:24}} >
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Landing />
          </Grid>
        </Grid>
       
      </div>
    )
  };
}

export default App;
