const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["buyer","seller"],
        validate:(value)=>{
            return value.tolowereCase()
        }
    },
    password:{
        type:String,
        required:true
    }
},{
    timeStamp:true
}

)


const User=mongoose.model("User",userSchema)
module.exports=User