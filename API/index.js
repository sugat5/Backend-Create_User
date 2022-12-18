require("dotenv").config()
const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const mongodbURL=process.env.DATABASE_URL
const mongoose=require("mongoose")
const User = require("./models/users")
mongoose.set("strictQuery",true)
const jsonParser=bodyParser.json()
const { v4: uuidv4 } = require('uuid');
const dataBase=mongoose.connect(mongodbURL)

app.post("/signup",jsonParser,async(req,res)=>{
    const existingUser= await User.findOne({email:req.body.email})
    if(existingUser){
          return res.send({error:"User Already Exist,Please Login"}).statusCode(400)
    }
    const authToken=uuidv4();
    try {const newUser= new User({...req.body,authToken:[authToken]})
    newUser.save()}
    catch{(error)=>{
        return res.send(error).status(400)
    }}
    res.send({msg:"User Created Successfully",authToken})
})

app.post("/signin",jsonParser,async(req,res)=>{
    const user= await User.findOne({email:req.body.email,password:req.body.password})
    if(user){
        const authToken=uuidv4()
        res.send({...req.body,authToken:[authToken]})
        
}else{
    res.send({msg:"User Not Found,Please Signup"})
}


})

app.get("/",(req,res)=>{
res.send("Hii My Name is Suga")
})


dataBase.then(()=>{
    app.listen(3000,(req,res)=>{
        console.log("Server Started")
        })
}).catch((err)=>{
    console.log("DB connection failed", err)
})
