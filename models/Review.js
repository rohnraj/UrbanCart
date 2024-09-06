const mongoose=require('mongoose')

//Schema is a constructor function inside mongoose and it's except object
//we can alos destructure it --> const {Schema}=mongoose; same name should be used
const reviewSchema=new mongoose.Schema({

    rating:{
        
        type:Number,
        min: 0,
        max: 5,
    },
    comment:{
        type: 'String',
        trim: true,
    },
}, {timestamps:true})

let Review=mongoose.model('Review', reviewSchema)
//joh model ban gya hai usse export karenge
module.exports=Review;