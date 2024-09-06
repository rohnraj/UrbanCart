const express=require('express')
const router=express.Router()
const Review=require('../models/Review')
const Product = require('../models/Product')
const {validateReview}=require('../middleware')

router.post('/products/:id/reviews', validateReview ,async(req,res)=>{

    try{

        const {id}=req.params
        const {rating, comment}= req.body
        const product=await Product.findById(id)//model se product utta liya
        const review=await Review.create({rating, comment})
    
        product.reviews.push(review)
        await product.save()
        req.flash('success','Review added successfully')
        res.redirect(`/products/${id}`)
    }
    catch(err){
        // use status -> 200, 201, 401, 404, 500
        res.status(500).render('error', {err: e.message})
    }

})

module.exports=router