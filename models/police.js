const mongoose = require('mongoose');
const validator= require('validator');

const policeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    avail_status: {
        type: Boolean,
        default: true
    }
})

policeSchema.virtual('missing_cars',{
    ref:'Cars',
    localField:'_id',
    foreignField:'police_assigned',
})

const Police=mongoose.model('Police',policeSchema);

module.exports = Police;
