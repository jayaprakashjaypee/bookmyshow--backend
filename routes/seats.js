const router = require("express").Router();
const { Router } = require("express");
const Seat = require("../models/Seat");
const authenticate = require("../verify");

router.post("/",async function (req,res){

    const newSeat = new Seat({

        row : req.body.row,
        column : req.body.column,
        booking :false
       
      });
      try {
        const user = await newSeat.save();
        res.status(201).json(user);
      } catch (err) {
        res.status(500).json(err);
      }


})

router.get("/",authenticate,async function(req,res){
    try{
    const seats = await Seat.find();
    res.status(200).json(seats);
    }
    catch(err){
        console.log(err);
    }
})

router.put("/booking",authenticate,async function(req,res){
  try{
    for(let i=0;i<req.body.booked.length;i++)
    {
  await Seat.findOneAndUpdate({row:req.body.booked[i].row,column:req.body.booked[i].column},{$set:{booking:true}});
    }
  res.status(200).json({
    message:"Booked"
  })
 
}
catch(err){
  res.status(500).json({
    message:err
  })
}
})




module.exports = router;