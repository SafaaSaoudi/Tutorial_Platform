const mongoose = require ("mongoose")
const config=async()=>{
    try { 
        await mongoose.connect("mongodb+srv://eyasomai:0000@tutoapp.ipta4hq.mongodb.net/test")
        console.log("connetion reussi")
        
    } catch (error) {
        console.log("erreur de connexionn")
    }
}
module.exports=config