const mongoose=require("mongoose")


const connection=mongoose.connect("mongodb+srv://hrusikeshviroot:hrusikesh@cluster0.6f6jgvj.mongodb.net/ai-story?retryWrites=true&w=majority")

module.exports={connection}