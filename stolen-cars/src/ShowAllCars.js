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
                this.setState({ car_details: response.result })
            })
    }
    handleClick(id) {
        fetch('/cars/update_status',{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
          }).then((response) => response.json())
            .then((response) => {
                this.setState({ car_details: response.result })
            })
    }

    render() {
        const car_details_length = this.state.car_details.length;
        let cards;
        if(car_details_length > 0){
            cards = this.state.car_details.map((each_car) => {
                return (
                    <div className="card" key={each_car._id}>
                        <div className="itemView">
                            <div className="left">
                                <p>CAR NUMBER : {each_car.car_number}.</p>
                                <p>CAR OWNER :{each_car.car_owner}</p>
                                <p>CONTACT NUMBER :{each_car.contact_number}</p>
                                <p>FINAL STATUS :{each_car.status}</p>
                                <p>POLICE ASSIGNED DETAILS : {each_car.police_assigned!==null?each_car.police_assigned.name:'No police assigned ! It will be automatically done when an officer is available '}</p>
                            </div>
                            <div className="right">
                                <Button className={each_car.status==='assigned'?'show':'hide'} variant="contained" color="primary" onClick={() => this.handleClick(each_car._id)}>Mark as Resolved</Button>
                            </div>
                        </div>
                    </div>  
                );
            });
        }else{
            cards = 
                <div className="align-center">
                    No data found
                </div>
            
        }
        
        return (
            <div className="container">
                {cards}
            </div>
        )
    }

}


export default ShowAllCars