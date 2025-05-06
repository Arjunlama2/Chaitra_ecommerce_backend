const handleError=(err,req,res,next)=>{
    console.log("this erro",err)

    res.status(err.staus).send(err)
}

module.exports={
    handleError
}