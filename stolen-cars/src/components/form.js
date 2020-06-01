import React from 'react';
import { InputLabel, FormHelperText, FormControl, Input} from '@material-ui/core';
import { Button } from '@material-ui/core';
import '../css/showAllCars.css';

class Formview extends React.Component {

    constructor(props) {
      super(props);
      this.state = { formData: {}};
    }
    changeHandler = (event) => {
        let event_target = event.target.id
        let evet_val = event.target.value
        this.setState((state) => {
            state.formData[event_target] = evet_val;
        })
    }

    sendData(){
        fetch('/cars/add',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.formData)
          }).then(function(response) {
            if(response.status===201){
                alert("Added successfully")
            }else{
                alert("some error occured")
            }
          })
    }

    render(){
        return(
            <div className="box" style={{margin:'auto',width:'50%', display: 'flex', flexDirection:'column'}}>
                <FormControl>
                    <InputLabel htmlFor="carNo">Car Number</InputLabel>
                    <Input id="car_number" aria-describedby="my-helper-text" onChange={this.changeHandler} />
                    <FormHelperText id="my-helper-text"></FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="owner">Car Owner</InputLabel>
                    <Input id="car_owner" aria-describedby="my-helper-text" onChange={this.changeHandler} />
                    <FormHelperText id="my-helper-text"></FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="contactNo">Contact Number</InputLabel>
                    <Input id="contact_number" aria-describedby="my-helper-text" onChange={this.changeHandler} />
                    <FormHelperText id="my-helper-text"></FormHelperText>
                </FormControl>
                <div style={{marginTop:50}}>
                    <Button variant="contained" color="primary" onClick={()=>this.sendData()}>
                        Submit
                    </Button>
                </div>
            </div>
        )
    }

}

export default Formview