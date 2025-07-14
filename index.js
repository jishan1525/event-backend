const { intializeDatabase } = require("./db/db.connect");
const Event = require("./models/event.models");
const express = require("express")
const app = express();
require("mongoose")



intializeDatabase();

app.use(express.json())
// const corsOptions = {
//   origin: "*",
//   credentials: true,
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

app.get("/event",(req,res)=>{
    res.json("Events will be displayed here")
})

const PORT= 3000
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})