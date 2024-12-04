const express=require('express')
const router=express.Router()
const User=require('../models/user')
const passport = require('passport')
const controller=require("../controllers/user")

router.route('/signUp')
//signUp
.get(controller.signUp)
//signUp post
.post(controller.signUpPost)

//login
router.route('/login')
.get(controller.login)
.post(
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true,
        }),
        controller.loginPost
    );

//logout
 router.get('/logout',controller.logout)
       
module.exports=router