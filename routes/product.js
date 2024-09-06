const express=require('express')
const Product = require('../models/Product') // ../ ye kyo kiya smjhna hai
const Review = require('../models/Review')
//Product ke model se data chahiye toh usse require karna padega
const router=express.Router() //Router act as a mini instance(server) -> needed bcz app ko export nhi kar skte
const {validateProduct, isLoggedIn, isSeller, isProductAuthor}=require('../middleware')

router.get('/products', isLoggedIn ,async(req,res)=>{

    try{
        
        let allproducts=await Product.find({})
        // req.flash('success', 'Product added successfully')
        res.render('products/index',{allproducts}) //ye address smjhna hai
    }
    catch(err){
        // use status -> 200, 201, 401, 404, 500
        res.status(500).render('products/error', {err: err.message})
    }
})

//to show the form to add new product
router.get('/product/new', isLoggedIn ,(req,res)=>{
    try{

        res.render('../views/products/new')
    }
    catch(err){
        // use status -> 200, 201, 401, 404, 500
        res.status(500).render('error', {err: err.message})
    }
})

//to actually add the product
router.post('/products',isLoggedIn , validateProduct , isSeller, async(req,res)=>{
    try{

        let {name , img , price , desc}=req.body
        // create accept an object we know like find
        await Product.create({name , img , price , desc, author:req.user._id}) //req.user mai joh currently working user hai uski saari infor hoti hai
        req.flash('success', 'Product added successfully')
        res.redirect('/products')
    }

    catch(err){
        // use status -> 200, 201, 401, 404, 500
        res.status(500).render('error', {err: err.message})
    }
})

//to show one product
router.get('/products/:id', isLoggedIn ,async(req,res)=>{
    try{

        const {id}=req.params
        const oneProduct=await Product.findById(id).populate('reviews')
        res.render('products/show',{oneProduct, msg: req.flash('msg')})
    }

    catch(err){
        // use status -> 200, 201, 401, 404, 500
        res.status(500).render('error', {err: err.message})
    }
})

//to show edit form
router.get('/products/:id/edit', isLoggedIn ,async(req,res)=>{
    try{

        const {id}=req.params
        const oneProduct=await Product.findById(id)
        res.render('products/edit',{oneProduct})
    }

    catch(err){
        // use status -> 200, 201, 401, 404, 500
        res.status(500).render('error', {err: err.message})
    }
})

//to actaully make update
router.patch('/products/:id', isLoggedIn ,validateProduct , async(req,res)=>{
    try{

        const {id}=req.params
        const {name,img,price,desc}=req.body
        await Product.findByIdAndUpdate(id,{name,img,price,desc})
        req.flash('success', 'Product edited successfully')
        res.redirect(`/products/${id}`)
    }

    catch(err){
        // use status -> 200, 201, 401, 404, 500
        res.status(500).render('error', {err: err.message})
    }
})

//to delete a product
router.delete('/products/:id', isLoggedIn , isProductAuthor,async(req,res)=>{
    try{

        const {id}=req.params;
        console.log(id , "idddd");
        await Product.findByIdAndDelete(id)
        //we need to delete too when we delete a product
        //this will not work in production phase
        // for(let idd of productfound.reviews){
        //     await Review.findByIdAndDelete(idd)
        // }
        req.flash('success', 'Product deleted successfully')
        res.redirect('/products')
    }
    catch(err){
        // use status -> 200, 201, 401, 404, 500
        res.status(500).render('error', {err: err.message})
    }
})
module.exports=router;