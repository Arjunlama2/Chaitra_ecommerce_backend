
const dotenv=require("dotenv")
const user=require("./routes/user.route")
dotenv.config()
const express=require("express")
const { handleError } = require("./utils/handleError")
const app=express()
app.get("",(req,res)=>{
    res.send("serve is listing")
})
app.use(express.json())
app.use("/api/v1",user)

app.use(handleError)


module.exports=app