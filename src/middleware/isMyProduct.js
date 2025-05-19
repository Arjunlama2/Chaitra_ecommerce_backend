const mongoose=require("mongoose")
const Product = require("../model/product.model")



const isMyProduct =async(req,res,next)=>{
const user_id=new mongoose.Types.ObjectId(req.user.user_id)
const product_id=new mongoose.Types.ObjectId(req.params.id)

const check=Product.findOne({
    _id:product_id,
    createdBy:user_id
})

if(check){
    next()
}else{
    res.status(401).send({message:"Forbidden"})
}



}




module.exports={
    isMyProduct
}