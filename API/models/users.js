const mongoose=require("mongoose")
const userCollection="user";


const User=mongoose.model(userCollection,{
    email:String,
    password:String,
    authToken:[{
        type:String
    }]
})
module.exports=User;                                                                                                                                                                                                                                                                                                                                                                                                                       







































































 