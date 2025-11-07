import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:"token not received"})
    }
    const token = authHeader.split(" ")[1]
   try {
     const verifiedToken = jwt.verify(token,process.env.SECRET_KEY)
     req.userId = verifiedToken.id
     next()
   } catch (error) {
    return res.status(401).json({message:"Invalid or expired token"})
   }
}

export default verifyToken