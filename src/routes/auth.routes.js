const express=require("express")
const router=express.Router()
const authcontrollers=require('../controllers/auth.controller')



router.post('/register',authcontrollers.registerUser)
router.post('/login',authcontrollers.loginUser)



module.exports=router