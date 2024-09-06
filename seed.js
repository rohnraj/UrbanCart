const mongoose=require('mongoose')//bzc we are working with database here 

const Product=require('./models/Product')

//5 dummy products
const products=[
    {
        name: 'Iphone 14pro',
        img:'https://images.unsplash.com/photo-1663408466313-2d4e7edaf172?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGlwaG9uZSUyMDE0JTIwcHJvfGVufDB8fDB8fHww',
        price: 130000,
        desc: 'very constly aukaat ke bahar'
    },
    {
        name:'Mackbook m2 pro',
        img:'https://images.unsplash.com/photo-1653820278078-b48ce5bdc28f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1ha2Jvb2slMjBtMiUyMHByb3xlbnwwfHwwfHx8MA%3D%3D',
        price: 250000,
        desc: 'ye toh bikul aukaat ke bahar'
    },
    {
        name: 'Samsung s12',
        img: 'https://images.unsplash.com/photo-1705530292519-ec81f2ace70d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2Ftc3VuZyUyMEdhbGF4eSUyMFMyNCUyMFVsdHJhfGVufDB8fDB8fHww',
        price: 159999,
        desc: 'ye phone ka camera achha hai '
    },
    {
        name:'iPad Air',
        img: 'https://images.unsplash.com/photo-1648806030599-c963fd14a22f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aVBhZCUyMEFpcnxlbnwwfHwwfHx8MA%3D%3D', 
        price: 59900,
        desc: 'lite waight ipad with lots of cool features'
    },
    {
        name:'Apple Watch',
        img:'https://images.unsplash.com/photo-1579811216948-6f57c19376a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBwbGUlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D', 
        price: 67999,
        desc: 'apple watch cool lgti hai but chain wali watch ka isse koi comparision nhi'
    }
]

//now seed in database
async function seedDB(){

    //await bzc every db opertion return pormise
    await Product.insertMany(products)
    console.log(`data seeded successfully`);
}

module.exports=seedDB;
