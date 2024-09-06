const mongoose=require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

//hume srif woh schema banana hai joh PLM nhi banayega 
const UserSchema= new mongoose.Schema({
    email:{
        type:'string',
        required:true,
        trime:true
    },
    role:{
        type:'string',
        required: true
    },
    cart:[
        {

            type:mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

UserSchema.plugin(passportLocalMongoose);

const User=mongoose.model('User',UserSchema)
module.exports=User;