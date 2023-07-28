const mongoose = require ("mongoose")
const connectDb=async()=>{
    try { 
        await mongoose.connect("mongodb+srv://eyasomai:0000@tutoapp.ipta4hq.mongodb.net/")
        console.log("db is connected")
        
    } catch (error) {
        console.log("db is not connected")
    }
}
module.exports=connectDb