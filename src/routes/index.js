const Auth= require("./user.route");
const Product=require("./product.route")
const express=require("express")
const category=require("./category.route")
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
    {
        path:"/category",
        route:category
    },
  
  

]




defaultRoutes.map((el)=>{
router.use(el.path,el.route)
})


module.exports=router



