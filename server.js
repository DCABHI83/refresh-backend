import express from 'express'
import router from './routes/userRoutes.js'
import connectDb from './config/db.js'
import dotenv from 'dotenv'
const app = express()
const port = process.env.PORT || 3000
dotenv.config()
connectDb()
app.use(express.json())


app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`)
    next()
})

app.use('/api',router)

app.get('/',(req,res)=>{
    res.send("Hello from express")
})


   app.use((err,req,res,next)=>{
    if(err){
        res.status(400).json({error:err.message})
    }
   })
app.listen(port)