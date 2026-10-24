const express = require('express');
const router = express.Router();

const {register, login, getProfilDiri, update} = require('../controllers/authController');
const {lindungiRute} = require ('../middlewares/authMiddleware');
//const { validasiRegister, validasiLogin, cekHasilValidasi } = require('../middlewares/validasiMiddleware');

router.post('/register',register);
router.post('/login', login);
router.put('/update',lindungiRute,update)


router.get('/saya',lindungiRute,getProfilDiri);

module.exports = router;