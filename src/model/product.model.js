const mongoose=require("mongoose")
const ObjectId=mongoose.Types.ObjectId
const userSchema=mongoose.Schema({
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
        type:String
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


const User=mongoose.model("User",userSchema)
module.exports=User