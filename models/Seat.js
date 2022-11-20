const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
  row : {type:Number,required:true},
  column : {type:String,required : true},
  booking : {type:Boolean , required : true}
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Seat", seatSchema);