if(process.env.NODE_ENV!="production")
{
    require("dotenv").config()
}
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const path=require('path')
const methodOverride=require("method-override")
const ejsMate=require('ejs-mate')
const ExpressError=require('./utils/ExpressError')
const listingsRouter=require('./routes/listings.js')
const reviewRouter=require('./routes/review.js')
const userRouter=require('./routes/user.js')
const session=require('express-session')
const flash=require('connect-flash')
const User=require('./models/user.js')
const passport=require('passport')
const LocalStrategy=require('passport-local')
const MongoStore = require('connect-mongo');
const { error } = require("console")



// const MONGO_URL="mongodb://127.0.0.1:27017/adventureabode"
const DB_URL=process.env.DB_URL
main()
.then(()=>{
    console.log("Connected to MongoDB")

})
.catch((err)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect(DB_URL )
}

app.set('view engine','ejs')
app.set('views',path.join(__dirname,"views"))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname,"/public")))

const Store = MongoStore.create({
    mongoUrl:DB_URL,
    crypto: {
      secret: 'mypassword'
    },
    touchAfter:24*3600
  })
  Store.on("error",()=>{
    console.log("Error in session store",error)
  })

const sessionOption={
    Store,
    secret:"mysecret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() +7*24*60*60*1000,
        maxAge:1000 * 60 * 60 * 24 * 3,
        httpOnly:true
    }
}
app.use(session(sessionOption))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



app.get('/',(req,res)=>{
    res.send('welcome to AdventureAbode')
})

app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.danger=req.flash("danger")
    res.locals.currUser=req.user
    next()
})

 app.use('/listings',listingsRouter)
 app.use('/listings/:id/reviews',reviewRouter)
 app.use('/',userRouter)

 
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found!"))
 })

 app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}=err
    res.status(statusCode).render('listings/error.ejs',{message})
 })
// app.get('/testListing',(req,res)=>{
//     let simplelisting=new listing({
//         title:'Simple Listing',
//         description:'This is a simple listing',
//         price:1000,
//         location:"pune",
//         country:"india"

//     })
//     simplelisting.save()
//     console.log("saved")
//     res.send("saved")
// })

app.listen(3000)