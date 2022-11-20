const router = require("express").Router();
const Movie = require("../models/Movie");
const nodemailer = require("nodemailer");
const MailMessage = require("nodemailer/lib/mailer/mail-message");
const User = require("../models/User");
const authenticate = require("../verify");

router.post("/",authenticate,async function(req,res){

    const newMovie = new Movie({

      movie : req.body.movie,
      theatre:req.body.theatre,
      time : req.body.time,
      description:req.body.description,
      link:req.body.link,
      genre : req.body.genre

       
      });
      try {
        const user = await newMovie.save();
        res.status(201).json(user);
      } catch (err) {
        res.status(500).json(err);
      }

})

router.get("/",authenticate,async function(req,res){
    try{
    const movies =await Movie.find();
res.status(200).json(movies);    
}
catch(err){
    res.status(500).json(err);
}

})

router.delete("/:id",authenticate,async function(req,res){
    try{
    await Movie.findByIdAndDelete({_id:req.params.id});
    res.status(200).json("Deleted successfully");
    }
    catch(err){
        console.log(err);
    }
})

router.post("/email",authenticate,async function (req,res){
  console.log(req.body);

try{
  await Movie.findOne({movie:req.body.movie,theatre:req.body.theatre});
  const user =  await User.findOne({_id:req.body.userid});
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'anusriraman.r@gmail.com',
      pass: "vbukhmczcdvjjfxt"
    }
  });

  var mailOptions = {
    from: 'anusriraman.r@gmail.com',
    to: `${user.email}`,
    subject: 'Book my show ticket',
    html:`<h1>${req.body.movie}</h1><h1>${req.body.theatre}</h1><p>${req.body.time}</p><h3>Seat Number : ${req.body.seat}</h3><h1>${req.body.total}</h1>
    <img src="https://www.emoderationskills.com/wp-content/uploads/2010/08/QR2.jpg"/> `
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.json({
        message:"Error"
    })
    } else {
      console.log('Email sent: ' + info.response);
      res.json({
        message: "ticket has been sent to your mail"
       
    })
    }
  });
}
catch(err){
  res.status(500).json(err);
}

})

module.exports = router;