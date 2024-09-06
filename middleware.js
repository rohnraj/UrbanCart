//creating our own middleware
//we made this middleware file to run before any specific task
const {productschema,reviewschema} =require('./schema')
const Product=require('./models/Product')

const validateProduct=(req,res,next)=>{
    const {name,img,price,desc}=req.body;
    const {error}=productschema.validate({name,img,price,desc}) 
    if(error){
        return res.render('products/error',{err:error.message})
    }
    next()
}
const validateReview=(req,res,next)=>{
    const {rating,comment}=req.body;
    const {error}=reviewschema.validate({rating,comment}) 
    if(error){
        return res.render('products/error',{err:error.message})
    }
    next()
}


const isLoggedIn = (req, res, next) => {
    // Check if the user is authenticated by calling the isAuthenticated function
    if (!req.isAuthenticated()) {
        req.flash('error', 'Login first');
        return res.redirect('/login');
    }
    // If authenticated, proceed to the next middleware or route handler
    next();
};

const isSeller=(req,res,next)=>{
    if(!req.user.role){
        req.flash('error', 'you donot have the permission to do that');
        return res.redirect('/products');
    }
    else if(!req.user.role==='seller'){
        req.flash('error', 'you donot have the permission to do that');
        return res.redirect('/products');
    }
    next();
}

const isProductAuthor=async(req,res,next)=>{
    let { id } = req.params;
    let product = await Product.findById(id);
    //equals is a method is used to check object_id are equal or not
    if(!product.author.equals(req.user._id)){
        req.flash('error', 'you donot have the permission to do that');
        return res.redirect('/products');
    }
    next();
}
module.exports={isLoggedIn,validateProduct,validateReview,isSeller,isProductAuthor}