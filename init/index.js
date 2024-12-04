const mongoose=require('mongoose')
const listing=require('../models/listing')
const initdata=require('./data')

const MONGO_URL="mongodb://127.0.0.1:27017/adventureabode"
main()
.then(()=>{
    console.log("Connected to MongoDB")

})
.catch((err)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect(MONGO_URL )
}

const initdb=async()=>{
    await listing.deleteMany({})
    initdata.data=initdata.data.map((obj)=>({
        ...obj,owner:"674ae7f49dcc5ec7cb9248e3"
    }))
    await listing.insertMany(initdata.data)
    console.log('data was init')
}
initdb()

