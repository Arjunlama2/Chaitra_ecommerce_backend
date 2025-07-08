const express=require("express")
const { createUser, login, getUsers, getOwnInfo } = require("../conttoller/user.controller")
const { authenticate } = require("../middleware/auth")

const router=express.Router()

router.post("/signup",createUser

)

  
router.post("/login",login
)
router.route("/").get(getUsers)
router.route("/me").get(authenticate,getOwnInfo)








module.exports=router