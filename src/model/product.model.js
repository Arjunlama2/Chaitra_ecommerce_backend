const mongoose=require("mongoose")

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const productSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:String,
        required:true
    },
    discription:{
        type:String,
       
        
    },
    image:{
        type: [String],
        required:true
    },
    category:{
        type:ObjectId,
        ref:"Category"
    },
    createdBy:{
        type:ObjectId,
        ref:"User"


    }
},{
    timeStamp:true
}

)
// productSchema.post("FindOneAndDelete")


const Product=mongoose.model("Product",productSchema)
module.exports=Product