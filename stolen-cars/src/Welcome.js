import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


class Welcome extends React.Component{
    constructor(props){
        super(props)
        this.state = {isToggleOn: true}
        //this.handleEvent = this.handleEvent.bind(this)
    }

    handleEvent = ()=> {
        this.setState((state)=>({isToggleOn:!state.isToggleOn}))
    }

    render(){
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography color="inherit">
                            Stolen Cars sample Application
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default Welcome