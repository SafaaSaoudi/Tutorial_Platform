const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var users = require('../models/user');




exports.Login=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user= await users.findOne({email})
        if(!user){
            res.status(400).send("email does not exist")
        }
        else{
            const match=bcrypt.compareSync(password,user.password)
            if(!match){
                res.status(400).send("wrong password")
            }
            else{
                const exp= Date.now()+1000*60*60*7
                const payload={id:user._id, exp}
                const token =jwt.sign(payload,"hello")
                
                res.status(200).cookie("login Authorization", token,{
                    expires:new Date (exp),
                    httpOnly:true
                }).send({msg:"login success",user,token,exp})
            }
        }
    } catch (error) {
        res.status(500).send(error) 
    }
}
exports.Logout=(req,res)=>{
    try {

        res.status(200).send({msg:"user logout"})
        //  res.Cookies("logout authorized")
    } catch (error) {
        res.status(500).send(error) 
    }

}

