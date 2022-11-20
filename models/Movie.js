const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
 movie : {type:String , required : true},
 time : {type:String,required:true},
 genre : {type:String,required:true},
 theatre : {type:String,required:true},
 description:{type:String,required:true},
 link:{type:String,required:true}
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", MovieSchema);