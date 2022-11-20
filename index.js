const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/users")
const SeatRoute = require("./routes/seats");
const MovieRoute = require("./routes/movies");

dotenv.config();

app.use(cors({
    origin:"*"
}))

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });


//middleware
app.use(express.json());
app.use("/server/users",userRoute);
app.use("/server/seats",SeatRoute);
app.use("/server/movies",MovieRoute);











app.get("/", (req, res) =>
  res.send(`Server Running`)
)

  app.listen (process.env.PORT||8800  ,()=>{
    console.log("Backend server is runing");
  })
