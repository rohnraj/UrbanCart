const express=require('express')
const User = require('../models/User')
const passport = require('passport')
const router=express.Router()

//form for signUp
router.get('/register',(req,res)=>{
    res.render('auth/signup')
})

//actually want to register a user to my DB
router.post('/register',async(req,res)=>{
    try{

        const {email, password, username, role}=req.body;
        const user=new User({email, username,role})
        //register is a static method directly work with database
        const newUser=await User.register(user, password)
        //anything work with database return promise
        // res.redirect('/products')
        // res.redirect('/login')
        req.logIn(newUser,function(err){
            if(err) return next(err)
            req.flash('success','you registered successfully')
            res.redirect('/products')
        })
    }
    catch(err){
        req.flash('error',e.message)
        return res.redirect('/singup')
    }
})

//to get login form
router.get('/login',(req,res)=>{
    res.render('auth/login')
})

//to actually login via the DB
router.post('/login', passport.authenticate('local', 
    { 
        failureRedirect: '/login' 
    }) ,
(req,res)=>{
    req.flash('success','welcome back')
    res.redirect('/products')
})

//logout
router.get('/logout',(req,res)=>{
    ()=>{
        req.logOut();
    }
    req.flash('success','goodbye friend come again')
    res.redirect('/login')
})

module.exports=router