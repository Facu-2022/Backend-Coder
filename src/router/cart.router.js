import { Router } from 'express'
import CartModel from '../DAO/mongoManager/models/cart.model.js'

const router = Router()


router.get('/', async(req,res)=>{
    const result = await CartModel.find()
    res.send(result)
})
router.get('/:cid/', async(req,res)=>{
    const cid = parseInt(req.params.cid)
    const result = await CartModel.getById(cid)
    res.send(result)
})
router.post('/', async(req,res)=>{
    const result = await CartModel.create({products: []})
    res.send({status: "cart creado exitsamente",result})
})
router.post('/:cid/product/:pid', async (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
  
    const cantidad = req.query.cantidad || 1

    const cart = await CartModel.findById(cid)
    cart.products.push({ id: pid, cantidad })
    const result = cart.save()
    res.send(result);
  });
export default router