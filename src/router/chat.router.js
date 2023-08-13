import { Router } from 'express';
import ChatModel from '../DAO/mongoManager/models/chat.model.js';

const router = Router();

router.get('/', (req, res) => {
  res.render('chat', {});
});

router.post('/send-message', async (req, res) => {
  const data = req.body;
  try {
    const savedMessage = await ChatModel.create(data);
    console.log('Mensaje guardado:', savedMessage);
    res.send(savedMessage);
  } catch (error) {
    console.error('Error al guardar el mensaje:', error);
    res.status(500).send('error al guardar');
  }
});

export default router;