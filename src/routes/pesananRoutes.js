const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus, deleteOrders } = require('../controllers/pesananController');

const { lindungiRute, hanyaAdmin } = require('../middlewares/authMiddleware');


router.post('/', lindungiRute, createOrder); 


router.get('/saya', lindungiRute, getMyOrders); 

router.get('/', lindungiRute, getAllOrders); 

router.put('/:id/status', lindungiRute, hanyaAdmin, updateOrderStatus); 
router.delete('/:id', lindungiRute, hanyaAdmin, deleteOrders ); 

module.exports = router;