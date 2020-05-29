const express= require('express');
const Cars=require('../models/cars');
const Police=require('../models/police');
const router = express.Router();
const _ = require('lodash')

router.post('/add',async (req,res)=>{
    var cars = '';
    var police_ = await Police.find({avail_status:true}, null, { limit: 1 });
    if(police_.length===1){
         cars= new Cars({
            ...req.body,
            status:'assigned',
            police_assigned:police_[0]._id
        })
        police_[0].avail_status = false
    }else{
        cars= new Cars({
            ...req.body
        })
    }

    try{
        await cars.save();
        if(police_.length===1){
            await police_[0].save();
        }
        res.status(201).send({status:201});

    }catch(e){
        console.log(e)
        res.status(500).send();
    }
});

router.get('/all',async(req,res)=>{
    try{
        var cars = await Cars.find({})
        var result = await get_assigned_police(cars)
        res.send({result})
    }catch(e){
        res.status(400).send(e);
    }
});

router.put('/update_status',async(req,res)=>{
    try{
        console.log(req.body.id)
        const _id = req.body.id;
        const update = { status: "completed" };
        const update_police = {avail_status:true}
        const update_new_police = {avail_status:false}
        let update_car = await Cars.findOneAndUpdate({_id}, update,{new:true});
        
        let police_assigned = await Police.findOneAndUpdate({_id:update_car.police_assigned},update_police,{new:true})

        let cars = await Cars.findOneAndUpdate({police_assigned:null,status:"pending"}, {police_assigned,status: "assigned"}, {new:true})
        let police_assigned_again = await Police.findOneAndUpdate({_id:update_car.police_assigned},update_new_police,{new:true})
        console.log(cars,police_assigned_again)
        res.status(200).send({status:200});
    }catch(e){
        console.log(e)
        res.status(400).send(e);
    }
});

function get_assigned_police(foundCars){
    return new Promise((resolve,reject)=>{
        let new_arr = []    
        _.forEach(foundCars,async(car)=>{
            new_arr.push(return_data(car))
        })
        Promise.all(new_arr).then((response)=>{
            resolve(response)
        })
    })
            
}

function return_data(car){
    return new Promise (async(resolve,reject)=>{
        each_police = await Police.findOne({_id:car.police_assigned})
        car.police_assigned = each_police
        resolve(car)

    })
}


module.exports = router;