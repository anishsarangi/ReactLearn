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
                this.setState((state) => {
                    state.car_details = response.result
                })
                console.log(this.state.car_details)
            })
    }

    render() {
        console.log(this.state.car_details)
        const cards = this.state.car_details.map((each_car) => {
            console.log(each_car)
            return (
                <div className="card" key={each_car.id}>
                    <div className="itemView">
                        <p>{each_car.number}.</p>
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