import React from 'react';
import { InputLabel, FormHelperText, FormControl, Input} from '@material-ui/core';
import { Button } from '@material-ui/core';


class Formview extends React.Component {

    sendData(){
        // Can use state for getting data
        var temp_data= {
            car_number :"OR-0234556",
            car_owner : "Anish Sarangi",
            contact_number: 8908443346,
        }
        fetch('/cars/add',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(temp_data)
          }).then(function(response) {
            console.log(response)
          })
    }

    render(){
        return(
            <div style={{margin:'auto',width:'50%'}}>
                <FormControl>
                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                </FormControl>
                <div style={{marginTop:50}}>
                    <Button variant="contained" color="primary" onClick={()=>this.sendData()}>
                        Primary
                    </Button>
                </div>
            </div>
        )
    }

}

export default Formview