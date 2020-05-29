const mongoose = require('mongoose');

const carsSchema = mongoose.Schema({
    car_number:{
        type: String,
        required: true
    },
    car_owner:{
        type: String,
        required: true
    },
    //TODO: add validates
    contact_number: {
        type: Number,
        required:true
    },
    status:{
        type: String,
        default: "pending"
    },
    police_assigned: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Police'
    }
})

const Cars= mongoose.model('Cars',carsSchema);

module.exports = Cars;