//creating server
const express=require('express');
const app=express();
const path=require('path')
const ejsMate=require('ejs-mate')
const methodOverride=require('method-override')
const flash=require('connect-flash')
const session=require('express-session')
const passport=require('passport')
const localStrategy=require('passport-local')
const User=require('./models/User')

//connecting to database
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopping-app')
.then((res)=>{
    console.log(`connected to database successfully`);
})
.catch((err)=>{
    console.log(`error encountered: ${err}`);
})
//seed ko acquire karlo
const seedDB=require('./seed')
// seedDB(); //ek baar chla ke comment kardo bzc nhi toh nodemon isse baar baar chladega but we want to inserted data one time in database

const porductsRoutes=require('./routes/product')
const reviewRoutes=require('./routes/review')
const userRoutes=require('./routes/auth')
const cartRoutes=require('./routes/carts')

//session
const configSession={

    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true } 
    cookie:{
        httpOnly: true,
        expires: Date.now() + 7*24*60*60*1000 ,
        maxAge: 7*24*60*60*1000
    }
}
app.use(session(configSession))

//PASSPORT

app.use(passport.initialize())
app.use(passport.session())

//serializeUser() and deserializeUser() are static method and static method help to put are data on schema
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new localStrategy(User.authenticate()));

//set ke time pe key or value deni padti hai
app.engine('ejs',ejsMate)//setting engine for ejs to provide more funtionality of ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')))

app.use(flash())
app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success=req.flash('success')
    res.locals.error=req.flash('error')
    next()
})
app.use(express.urlencoded({ extended: true }))//ye pehle ayega bcz data pehle encode hojae body ka then rout pe jaenge
app.use(porductsRoutes);//so that hr ek incoiming request pe routes ka folder subse pehle chale
app.use(reviewRoutes)
app.use(userRoutes)
app.use(cartRoutes)



const PORT=8080;
app.listen(PORT, ()=>{
    console.log(`server connected to port number: ${PORT}`);
})
//app can't be exported as it is instance of your application and there is only one instance should be there in your entire project