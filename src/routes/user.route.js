const express=require("express")
const { createUser, login, getUsers } = require("../conttoller/user.controller")

const router=express.Router()

router.post("/signup",createUser

)

  
router.post("/login",login
)
router.route("/").get(getUsers)








module.exports=router