const pesananService = require('../services/pesananService');

const createOrder = async (req,res) => {
    try{
        const penggunaId = req.user.id;
        const {layananId, catatanKebutuhan} = req.body;

        if (!layananId || !catatanKebutuhan){
            return res.status(400).json({status:'gagal', pesan:"id layanan dan catatan kebutuhan wajib diisi"})
        }

        const pesananBaru = await pesananService.buatPesanan(penggunaId,layananId, catatanKebutuhan);
        return res.status(201).json({status:'sukses', pesan : 'pesanan berhasil dibuat', data: pesananBaru})
    } catch(error){
        return res.status(400).json({status:'gagal',pesan:error.message});
    }
    
}
const getMyOrders = async (req, res) => {
    try {
        const penggunaId = req.user.id; 
        const pesananSaya = await pesananService.ambilPesananSaya(penggunaId);
        return res.status(200).json({ status: 'sukses', data: pesananSaya });
    } catch (error) {
        return res.status(500).json({ status: 'gagal', pesan: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const semuaPesanan = await pesananService.ambilSemuaPesanan();
        return res.status(200).json({ status: 'sukses', data: semuaPesanan });
    } catch (error) {
        return res.status(500).json({ status: 'gagal', pesan: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const pesananId = req.params.id;
        const { status, fileHasilUrl } = req.body;

        const pesananDiperbarui = await pesananService.perbaruiStatus(pesananId, status, fileHasilUrl);
        return res.status(200).json({ status: 'sukses', pesan: `Status pesanan berhasil diubah menjadi ${status}`, data: pesananDiperbarui });
    } catch (error) {
        return res.status(400).json({ status: 'gagal', pesan: error.message });
    }
};

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus };