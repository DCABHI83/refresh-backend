import express from 'express'

import User from '../models/usermodel.js'
 const router = express.Router()

router.get('/users',(req,res)=>{
    res.status(200).json({message:"users sent",User})
})

router.post('/users',async(req,res,next)=>{
   try {
 
     const {name,email,password} = req.body
     if(!name || !email || !password){
      throw new Error("All fields are required")
     }
     const existingEmail = await User.findOne({email})
     if(existingEmail){

        throw new Error("User Already exist")
     }

 await User.create({name,email,password})
       
        res.status(201).json({message:"User created successfully"})
   } catch (error) {
   res.status(400).json({message:error.message})
   }
})

export default router

