const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const layananRoutes = require('./routes/layananRoutes');
const pesananRoutes = require('./routes/pesananRoutes');
const transaksiRoutes = require('./routes/transaksiRoutes');

const app = express();

const corsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/layanan', layananRoutes);
app.use('/api/pesanan', pesananRoutes);
app.use('/api/transaksi', transaksiRoutes);

app.get('/', (req, res) => {
    res.json({ pesan: 'API Sistem Jasa Edit Aethera Aktif' });
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
    app.listen(PORT, '127.0.0.1', () => {
        console.log(`Server Enterprise aktif di http://127.0.0.1:${PORT}`);
    });
}

module.exports = app;