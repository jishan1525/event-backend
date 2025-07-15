const { error } = require("cros/common/logger");
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

const getAllEvent = async() => {
    try {
        const data = await Event.find()
        return data;
    } catch (error) {
        throw error;
    }
}

app.get("/event",async(req,res)=>{
    try {
        const data = await getAllEvent();
        if(data){
            res.json(data)
        }
        else{
             res.status(401).json({ error: "No event found" });
        }
    } catch (error) {
          res.status(404).json({ error: "Unable to fetch Data" });
    }
})
 



const createEvent= async (newEvent) => {
try {
    const event = new Event(newEvent)
    const saveEvent = await event.save();
    return saveEvent;
} catch (error) {
   throw error; 
}
}
 
app.post("/event",async(req,res)=>{
    
    try {
        const newEvent =await createEvent(req.body)
        res.status(201).json({message:"Event Added successfully.",event:newEvent})
    } catch (error) {
         console.error("Error adding event:", error);
  res.status(500).json({ error: "Failed to add event" });
    }
})

const getEventByTitleOrTag =async(key) =>{
    try {
        console.log("Searching by Title")
        const eventByTitle = await Event.findOne({ title: key });
        if(eventByTitle){
            return eventByTitle;
        }
        else{
            const eventByTag = await Event.find({eventTags:key})
            return eventByTag
        }
    } catch (error) {
        throw error
    }
}

app.get("/event/:key",async(req,res)=>{
    try {
      const event= await getEventByTitleOrTag(req.params.key)
      if(event){
        res.json(event)
      }
      else{
        res.status(401).json({error:"No event found"})
      }
    } catch (error) {
       res.status(404).json({ error: "Unable to fetch Data" });
    }
})


const getEventById = async(id)=>{
    try {
        const event =await Event.findById(id);
        return event;
    } catch (error) {
        throw error;
    }
}

app.get("/events/:id",async(req,res)=>{
    try{const event = await getEventById(req.params.id)
    if(event){
        res.json(event)
    }
    else{
      res.status(401).json({ error: "No event found" });  
    }
}
 catch{
    res.status(404).json({ error: "Unable to fetch Data" });
 }   
})
const PORT= 3000
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})