import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
    Link
  } from "react-router-dom";

class Welcome extends React.Component{
    render(){
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                    <Link to='/' >
                        <Typography color="inherit" >
                            
                                Stolen Cars sample Application
                           
                        </Typography>
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default Welcome