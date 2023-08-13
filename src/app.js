import express from "express";
import productRouter from './router/product.router.js'
import __dirname from "./utils.js";
import { Server } from 'socket.io'
import viewsRouter from './router/views.router.js'
import handlebars from 'express-handlebars'
import cartRouter from './router/cart.router.js'
import ProductManager from "./DAO/fileManager/product.manager.js";
import mongoose from "mongoose";
import chatRouter from './router/chat.router.js'
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/static', express.static(__dirname + '/public'))

app.use('/', viewsRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/chat', chatRouter)


const URL =  "mongodb+srv://Facu2024:Facu2024@ecommerce.ybfxkuq.mongodb.net/"




const serverConnect = () => {
    const httpServer = app.listen(8080, () => console.log('listening...'))
    const io = new Server(httpServer)
    const messages = [];
    io.on('connection', socket => {
        console.log("cliente conectado");
        socket.on('new-product', async data => {
            const productManager = new ProductManager()
            await productManager.create(data)
    
            const products = await productManager.list()
            io.emit('reload-table', products)
        })
    

        socket.on('new', user => console.log(`${user} se ha conectado`))

        socket.on('message', data => {
            messages.push(data)
            io.emit('logs', messages)
        })
        socket.on('cliente:message', data => {
            messages.push(data);
            io.emit('server:messages', messages);
        })
    })

}



mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ecommerce',
})
    .then(() => {
        console.log('base de datos conectada!');
        serverConnect()
    })
    .catch(e => console.log("no se pudo conectar a la base de datos"))

mongoose.connection.on('error', (error) => {
    console.error('Error al conectar MongoDB:', error.message);
});
























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