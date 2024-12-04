const User=require('../models/user')

//get signup
module.exports.signUp=(req,res)=>{
    res.render('./users/signUp.ejs')
} 
//post signup
module.exports.signUpPost=async(req,res)=>{
    try {
     let{email,username,password}=req.body
     const newUser=new User({email,username})
     const registerUser=await User.register(newUser,password)
     req.login(registerUser,(err)=>{
         if(err){
             return next(err)
         }
     req.flash("success","Welcome to the AdventureAbode")
     res.redirect('/listings')
     })
    } catch (error) {
     req.flash('danger',error.message)
     res.redirect("/signUp")
    }
 }
 //get login
 module.exports.login=(req,res)=>{
    res.render('./users/login.ejs')
    }
//post login
 module.exports.loginPost=async (req, res) => {
    req.flash("success", "Welcome to AdventureAbode");
    let redirectUrl=res.locals.redirectUrl || '/listings'
     res.redirect(redirectUrl);
}
//logout
module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        req.flash('success',"Logged out successfully")
        res.redirect('/listings')
    })
}   