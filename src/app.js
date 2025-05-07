
const dotenv=require("dotenv")
const router=require("./routes/index")
dotenv.config()
const express=require("express")
const { handleError } = require("./utils/handleError")
const app=express()
app.get("",(req,res)=>{
    res.send("serve is listing")
})
app.use(express.json())
app.use("/api/v1",router)

app.use(handleError)


module.exports=app