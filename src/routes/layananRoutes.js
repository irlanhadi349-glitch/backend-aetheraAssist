const express = require('express');
const router = express.Router();


const { getAllLayanan, getLayananById, createLayanan, updateLayanan, deleteLayanan } = require('../controllers/layananController');


const { lindungiRute, hanyaAdmin } = require('../middlewares/authMiddleware');

router.get('/', getAllLayanan);          
router.get('/:id', getLayananById);      


router.post('/', lindungiRute, hanyaAdmin, createLayanan);       
router.put('/:id', lindungiRute, hanyaAdmin, updateLayanan);     
router.delete('/:id', lindungiRute, hanyaAdmin, deleteLayanan);  

module.exports = router;