import express from "express";
import productRouter from './router/product.router.js'
import cartRouter from './router/cart.router.js'

const app = express();
app.use(express.json())

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.listen(8080)





























// import express from 'express'
// import ProductManager from './producto.js'



// const app = express()

// app.use(express.json())



// const productManager = new ProductManager('../productos.json')



// app.get('/products', async (req, res) => {
    
//     const limit = req.query.limit

//     const products = await productManager.getProducts()

//     if (limit < products.length) products.length = limit

//     res.json(products)




// })

// app.get('/products/:pid', async (req, res) => {

//     try {

//         const pid = parseInt(req.params.pid)

//         const product = await productManager.getProductById(pid)

//        if (product){
//         res.json(product)
//        }else{
//         res.status(404).json({message: 'Product not found'})
//        }

//     } catch (error) {

//         res.status(500).json({message : "error.message"})
//     }

// })



// app.listen(8080, () => console.log("programa corriendo perfectamente"))