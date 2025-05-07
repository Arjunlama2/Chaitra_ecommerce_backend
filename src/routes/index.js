const Auth= require("./user.route");

const express=require("express")
const router=express.Router()


const defaultRoutes=[
    {
        path:"/user",
        route:Auth
    },
  

]


defaultRoutes.map((el)=>{
router.use(el.path,el.route)
})


module.exports=router



