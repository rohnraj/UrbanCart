var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser('rohan')) //hr incoming request pe uska info store karega 

app.get('/',(req,res)=>{
    res.send('accept cookies')
})
app.get('/setcookie',(req, res)=> {
  // Cookies that have not been signed
//   console.log('Cookies: ', req.cookies)

  // Cookies that have been signed
//   console.log('Signed Cookies: ', req.signedCookies)

  res.cookie('mode','dark');
  res.cookie('location', 'delhi paschimpuri')
  res.cookie('password','Luxury@11',{signed: true})


  res.send(req.signedCookies)
})

app.get('/getcookie',(req,res)=>{
    const {mode, location, password}=req.cookies
    res.send(`mode is ${mode}, location is ${location}, password is ${password}`)
})

const PORT=8081;

app.listen(PORT,()=>{
    console.log(`server connected to port->${PORT}`);
})
