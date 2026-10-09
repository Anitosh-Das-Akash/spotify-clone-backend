const express=require("express")
const router=express.Router()
const authcontrollers=require('../controllers/auth.controller')



router.post('/register',authcontrollers.registerUser)
router.post('/login',authcontrollers.loginUser)
router.post('/logout',authcontrollers.logoutUser)



module.exports=router