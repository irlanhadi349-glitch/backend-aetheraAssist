const express = require('express');
const router = express.Router();
const {getTransaksi,getTransaksiById, buatTransaksi, updateStatusTransaksi, deleteTransaksi} = require('../controllers/transaksiController');
const{lindungiRute, hanyaAdmin} = require('../middlewares/authMiddleware');

router.get('/',lindungiRute,getTransaksi);
router.get('/saya',lindungiRute,getTransaksiById);
router.post('/',lindungiRute,buatTransaksi);
router.put('/:id',lindungiRute,hanyaAdmin,updateStatusTransaksi);
router.delete('/:id',lindungiRute,hanyaAdmin,deleteTransaksi);


module.exports = router;
