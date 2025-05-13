const mongoose=require("mongoose")

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const reviewSchema=mongoose.Schema({

    product:{
        type:ObjectId,
        ref:"Product"
    },
    reviewedBy:{
        type:ObjectId,
        ref:"User"


    },
    comment:{
        type:String,
        
    },
    rate:{
        type:Number,
        max:5,
        min:1

    }
},{
    timeStamp:true
}

)


const Review=mongoose.model("Review",reviewSchema)
module.exports=Review