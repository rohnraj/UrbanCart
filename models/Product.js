const mongoose=require('mongoose')
const Review = require('./Review')
const { authorize } = require('passport')

//Schema is a constructor function inside mongoose and it's except object
//we can alos destructure it --> const {Schema}=mongoose; same name should be used
const productsSchema=new mongoose.Schema({

    name:{
        //String ka s capital hoga bzc inbuil class hai
        type:'String',
        trim: true,//to avoid extra spaces in name providedby user
        required: true
    },
    img:{
        type: 'String',
        trim: true,
        // default:

    },
    price:{
        type: Number,
        min: 0,
        required: true,
    },
    desc:{
        type:'String',
        trime:true
    },
    //array bcz bohot saare reviews hoskte hai
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,//to store objectId
            ref:'Review'
        }
    ],
    author:{
        type:mongoose.Schema.Types.ObjectId,//to store objectId
        ref:'User'
    }
})

//middleware-> findOneAndDelete
//post work after productionSchema is created and pre work before productionSchema
productsSchema.post('findOneAndDelete',async (id)=>{
    if(id.reviews.length>0){
        // {$in:id.reviews} -> object hai key value pair
        await Review.deleteMany({_id:{$in:id.reviews}})
    }
})


let Product=mongoose.model('Product', productsSchema)
//joh model ban gya hai usse export karenge
module.exports=Product;