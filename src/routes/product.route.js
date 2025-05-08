const express=require("express")
const { authenticate, isSeller } = require("../middleware/auth")

const router=express.Router()
router.route("/").get((req,res)=>{
    res.send("all product")
}).post(authenticate,isSeller,)
// router.route("/:id").get().delete().patch()







module.exports=router