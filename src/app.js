
const path=require("path")
const uploadDir = path.join(__dirname, '../uploads');

const dotenv=require("dotenv")
const router=require("./routes/index")
dotenv.config()
const express=require("express")
const { handleError, errorConverter, errorHandler } = require("./utils/handleError")
const app=express()
app.get("",(req,res)=>{
    res.send("serve is listing")
})
app.use(express.json())

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadDir));

app.use("/api/v1",router)

app.use(errorConverter)
app.use(errorHandler)


module.exports=app