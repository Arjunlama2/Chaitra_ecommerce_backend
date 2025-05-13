const jwt = require("jsonwebtoken");
const { SELLER ,BUYER} = require("../../constants");

const authenticate=(req,res,next)=>{
const token=req.headers.authorization.split(" ")[1]

if(!token){
    res.status(401).send({message:"Please authenticate"})
}

const user  = jwt.verify(token, process.env.JWT_SECRET);

req.user=user
next()

}

const isSeller=(req,res,next)=>{
if(req.user.role==SELLER)
{
    next()
}else{
    res.status(403).send({message:"forbidden"})
}
}


const isBuyer=(req,res,next)=>{
    if(req.user.role==BUYER){
        next()
    }else{
        res.status(403).send({message:"forbidden"})
    }
    }
    
    



module.exports={
    authenticate,
    isSeller,
    isBuyer

}

