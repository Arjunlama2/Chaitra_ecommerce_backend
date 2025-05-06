const express=require("express")

const router=express.Router()

router.route('/user')
  .get((req, res) => {
    res.send('Get all users')
  })
  .post((req, res) => {
    res.send('add usersk')
  })

// router.route("user/:id").delete().patch()








module.exports=router