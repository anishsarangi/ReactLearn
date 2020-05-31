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
        const _id = req.body.id;
        const update = { status: "completed" };
        const update_police = {avail_status:true}
        let update_car = await Cars.findOneAndUpdate({_id}, update,{new:true});
        let police_assigned = await Police.findOneAndUpdate({_id:update_car.police_assigned},update_police,{new:true})
        let status = await check_pendings()
        var cars_new = await Cars.find({})
        var result_new = await get_assigned_police(cars_new)
        res.status(200).send({status:200,result:result_new});
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

function check_pendings(){
    return new Promise(async(resolve,reject)=>{
        car_avail = await Cars.find({status:"pending"}, null, { limit: 1 });
        police_avail = await Police.find({avail_status:true}, null, { limit: 1 });
        if(car_avail.length==1 && police_avail.length==1){
            let car_reassigned = await Cars.findOneAndUpdate({_id:car_avail[0]._id},{police_assigned:police_avail[0],status:"assigned"},{new:true})
            let police_reassigned = await Police.findOneAndUpdate({_id:police_avail[0]._id},{avail_status:false},{new:true})
            resolve(true)
        }else{
            resolve(false)
        }
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