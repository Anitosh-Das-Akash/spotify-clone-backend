const express=require('express')
const cookieparser=require('cookie-parser')
const authroutes=require('../src/routes/auth.routes')
const musicroutes=require('../src/routes/music.routes')



const app=express()
app.use(express.json())
app.use(cookieparser())

app.use('/api/auth',authroutes)
app.use('/api/music',musicroutes)



module.exports=app