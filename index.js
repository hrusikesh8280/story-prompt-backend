
const express=require("express")
const cors = require("cors")
const { connection } = require("./connection/db")

require("dotenv").config()
const userRoutes = require("./routes/userRoutes")
const storyRoutes = require("./routes/storyRoutes")
const storySave = require("./routes/savedStoryRoutes")

const app=express()
app.use(cors())
app.use(express.json())


app.get("/",(req,res)=>{
    console.log("home page");
})

app.use("/api/user",userRoutes)
app.use("/api/story",storyRoutes)
app.use("/api/story",storySave)

app.listen(7000,async()=>{
    try{
        await connection
        console.log("Server is Connected to Mongoose")
    }catch(err){
        console.log(err)
    }
    console.log(`server is connected to  7000`)
})