const express=require("express")
const dotenv=require("dotenv")
dotenv.config()
const mongoose=require("mongoose")
const app=require("./app")


const port=process.env.PORT



mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    return new Promise((resolve) => {
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
        resolve();
      });
    });
  })
  .catch((err) => {
    console.log(err)
  })



