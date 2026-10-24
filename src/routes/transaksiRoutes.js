const express = require('express');
const router = express.Router();
const {getTransaksi, buatTransaksi, updateStatusTransaksi} = require('../controllers/transaksiController');
const{lindungiRute, hanyaAdmin} = require('../middlewares/authMiddleware');

router.get('/',lindungiRute,getTransaksi);
router.post('/',lindungiRute,buatTransaksi);
router.put('/:id',lindungiRute,hanyaAdmin,updateStatusTransaksi);


module.exports = router;
