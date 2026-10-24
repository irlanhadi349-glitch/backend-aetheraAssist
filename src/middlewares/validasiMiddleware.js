const { body, validationResult } = require('express-validator');

// Kumpulan aturan untuk form registrasi
const validasiRegister = [
    body('email').isEmail().withMessage('Format email tidak valid (harus ada @)'),
    body('password').isLength({ min: 8 }).withMessage('Password minimal 8 karakter'),
    body('namaLengkap').notEmpty().withMessage('Nama lengkap wajib diisi'),
    body('telepon').isMobilePhone('id-ID').withMessage('Gunakan nomor telepon Indonesia yang valid')
];

const validasiLogin = [
    body('email').isEmail().withMessage('Format email tidak valid'),
    body('password').notEmpty().withMessage('Password wajib diisi')
];

// Fungsi untuk menangkap jika ada aturan yang dilanggar
const cekHasilValidasi = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Mengembalikan error ke pengguna dan menghentikan proses
        return res.status(400).json({ status: 'gagal', pesan: errors.array()[0].msg });
    }
    // Jika lolos semua aturan, lanjut ke tahap berikutnya
    next(); 
};

module.exports = { validasiRegister,validasiLogin, cekHasilValidasi };