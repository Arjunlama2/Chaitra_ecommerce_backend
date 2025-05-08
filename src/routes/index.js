const Auth= require("./user.route");
const Product=require("./product.route")
const express=require("express")
const router=express.Router()


const defaultRoutes=[
    {
        path:"/user",
        route:Auth
    },
    {
        path:"/product",
        route:Product
    },
  
  

]




defaultRoutes.map((el)=>{
router.use(el.path,el.route)
})


module.exports=router



