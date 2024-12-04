// const listing=require("../routes/listings")
const listing=require('../models/listing')

//index 
module.exports.index=async(req,res)=>{
    const allListings=await listing.find({})
    res.render('listings/index.ejs',{allListings})
    }
 //new form
 module.exports.newForm=(req,res)=>{
    res.render('listings/new.ejs')
}
//show
module.exports.show=async(req,res)=>{
    let {id}=req.params
    const Listing=await listing.findById(id)
    .populate({path:"reviews",
        populate:{path:"author",},
    })
    .populate('owner')
    if(!Listing){
        req.flash("danger","No listing found")
        res.redirect('/listings')
    }
    res.render('listings/show.ejs',{Listing})
 }
 //create listing
 module.exports.create=async(req,res)=>{
    let url=req.file.path
    let filename=req.file.filename
    const newListing=new listing(req.body.Listing)
    newListing.owner=req.user._id
    newListing.image={url,filename}
    await newListing.save()
    req.flash('success',"new listing created")
    res.redirect('/listings')
 }
 //edit listings
 module.exports.edit=async(req,res)=>{
    let {id}=req.params
    const Listing=await listing.findById(id)
    if(!Listing){
        req.flash("danger","No listing found")
        res.redirect('/listings')
    }
    res.render('listings/edit.ejs',{Listing})
 }
 //update listings
 module.exports.update=async(req,res)=>{
    let {id}=req.params
   let Listing=await listing.findByIdAndUpdate(id,{...req.body.Listing})
   if(typeof req.file!=="undefined")
    {
   let url=req.file.path
   let filename=req.file.filename
   Listing.image={url,filename}
   await Listing.save()
   }
   req.flash("success","Listing Updated")
   res.redirect('/listings')
 }
 //delete listings
 module.exports.delete=async(req,res)=>{
    let{id}=req.params 
  let deletedListing=  await listing.findByIdAndDelete(id)
  console.log(deletedListing)
  req.flash("danger","Listing Deleted")
  res.redirect('/listings')
}  