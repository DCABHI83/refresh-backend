import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/usermodel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
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
     const hashedPassword = await bcrypt.hash(password,10)
     const existingEmail = await User.findOne({email})
     if(existingEmail){

        throw new Error("User Already exist")
     }

 await User.create({name,email,password:hashedPassword})
       
        res.status(201).json({message:"User created successfully"})
   } catch (error) {
   res.status(400).json({message:error.message})
   }
})

//login

router.post('/login',async(req,res,next)=>{
try {
    const {email,password}= req.body
   if(!email || !password){
      return res.status(400).json({message:"All fields are required"})
   }
   const user = await User.findOne({email})
   // console.log(user)
   if(!user){
      return res.status(404).json({message:"user not found"})
   }
   const match = await bcrypt.compare(password,user.password)
   if(match){

      const token= jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'1h'})
            res.status(200).json({message:"user logged in successfully",token})
 
   }
   else{
      return res.status(400).json({message:"invalid credentials"})
   }
} catch (error) {
   console.log(error.message)
}
})

export default router

