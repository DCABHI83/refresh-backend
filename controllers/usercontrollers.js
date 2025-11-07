import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'



//registerUser
export const registerUser = async(req,res)=>{
   try {
     const {name,email,password} = req.body
     if(!name || !email || !password){
         return res.status(400).json({message:"All fields are required"})
     }
 
     const existingEmail =await User.findOne({email})
     if(existingEmail){
         return res.status(400).json({message:"User already exists"})
     }
     const hashedPassword = await bcrypt.hash(password,10)
     await User.create({name,email,password:hashedPassword})
 res.status(201).json({message:"user registerd successfully"})
   } catch (error) {
    res.status(400).json({message:error.message})
   }
}

//loginUser
export const loginUser = async(req,res)=>{
  try {
    const {email,password} = req.body
    if(!email || !password){
      return res.status(400).json({message:"All fields are required"})
    }
    const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    const match = bcrypt.compare(password,user.password)
    if(!match){
     return res.status(400).json({message:"invalid credentials"})
    }
    const token = jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"1h"})
    const {password:_,...userData} = user.toObject()
    res.status(200).json({message:"user registered successfully",userData,token})
  } catch (error) {
    return res.status(404).json({message:error.message})
  }

}

//getprofile
export const getProfile = async(req,res)=>{
    try {
       const user = await User.findById(req.userId).select("-password")
       if(!user){
        return res.status(404).json({message:"User not found"})
       }
       res.status(200).json({mesage:"User found",user})
    } catch (error) {
        res.staus(500).json({message:error.mesage})
    }
}
