import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from './models/User.js';

const app = express();
app.use(express.json());


const PORT=process.env.PORT ||5000;

mongoose.connect(process.env.MONGODB_URL,()=>{
    console.log('connected to mongodb')
})


//api routes start here

app.post('/signup',async(req,res)=>{
   
   const {name,email,phone,password,role} =req.body;

//    if(!name ||!phone||!email||!password||!role){
//     return res.json({
//         success:false
//     })
//    }

   const user = new User({
    name:name,
    email:email,
    phone:phone,
    password:password,
    role:role
   })

   const savedUser = await user.save();
   res.json({
    success:true,
    message:"user created successfully",
    data:savedUser
   })

})



//api routes ends here




app.listen(PORT,()=>{
    console.log("server is running on port 5000")
})