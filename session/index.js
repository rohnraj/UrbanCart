const exprss=require('express')
const app=express()
const session=require('express-session')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true } //for https s->security
}))

app.get('/', (req,res)=>{
    res.send('welcome to the session')
})

app.get('/viewcount',(req,res)=>{
    if(req.session.count) req.session.count+=1;
    else req.session.count=1;
    res.send(`you visited to this page ${req.session.count}`)
})

app.get('/setname', (req,res)=>{
    req.session.username='rohan raj'
    res.redirect('/greet')
})
app.get('/greet',(req,res)=>{
    
    let {username='anonymous'}=req.session;
    res.send(`hi from ${username}`)
})

app.listen(8080,()=>{
    console.log('successfully connected to PORT->8080');
    
})