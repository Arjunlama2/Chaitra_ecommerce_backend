const express=require("express")
const { createUser, login } = require("../conttoller/user.controller")

const router=express.Router()

router.post("/signup",createUser

)

  
router.post("/login",login
)
// router.route("user/:id").delete().patch()








module.exports=router