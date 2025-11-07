import express from 'express'

import User from '../models/usermodel.js'

import dotenv from 'dotenv'
import verifyToken from '../middleware/authmiddleware.js'
import { getProfile, loginUser, registerUser } from '../controllers/usercontrollers.js'
dotenv.config()
const router = express.Router()

router.get('/users', async (req,res)=>{
   const user = await User.find()
    res.status(200).json({message:"users sent",user})
   
})

//user creation
router.post('/signup',registerUser)
//login

router.post('/login',loginUser)


//profile
router.get('/profile',verifyToken,getProfile  )

export default router

