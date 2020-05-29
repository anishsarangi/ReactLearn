import React from 'react';
import { Box, Button } from '@material-ui/core';
import './showAllCars.css'




class ShowAllCars extends React.Component {
    constructor(props) {
        super(props)
        this.state = { car_details: [] }
    }

    componentWillMount() {
        fetch('/cars/all')
            .then((response) => response.json())
            .then((response) => {
                this.setState(this.setState({ car_details: response.result }))
                console.log(this.state.car_details)
            })
    }
    handleClick(id) {
        console.log('this is:', id);
        fetch('/cars/update_status',{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
          }).then(function(response) {
            console.log(response)
          })
    }

    render() {
        const cards = this.state.car_details.map((each_car) => {
            return (
                <div className="card" key={each_car._id}>
                    <div className="itemView">
                        <div className="left">
                            <p>{each_car.car_number}.</p>
                            <p>{each_car.car_owner}</p>
                            <p>{each_car.contact_number}</p>
                            <p>{each_car.police_assigned!==null?each_car.police_assigned.name:'No police assigned'}</p>
                        </div>
                        <div className="right">
                            <Button className={each_car.status==='assigned'?'show':'hide'} variant="contained" color="primary" onClick={() => this.handleClick(each_car._id)}>Mark as Resolved</Button>
                        </div>
                    </div>
                </div>  
            );
          });
        return (
            <div className="container">
                {cards}
            </div>
        )
    }

}


export default ShowAllCars