const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus } = require('../controllers/pesananController');

const { lindungiRute, hanyaAdmin } = require('../middlewares/authMiddleware');


router.post('/', lindungiRute, createOrder); 


router.get('/saya', lindungiRute, getMyOrders); 

router.get('/', lindungiRute, hanyaAdmin, getAllOrders); 

router.put('/:id/status', lindungiRute, hanyaAdmin, updateOrderStatus); 

module.exports = router;