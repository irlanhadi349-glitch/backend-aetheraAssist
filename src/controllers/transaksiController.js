const transaksiService = require('../services/transaksiService');

const getTransaksi = async (req, res) => {
    try{
        const transaksi = await transaksiService.ambilTransaksi();
        return res.status(200).json({status:'sukses', pesan:'data transaksi berhasil diambil', data:transaksi})
    }catch(error){
        return res.status(400).json({status:'gagal',pesan:error.message});
    }
}
const getTransaksiById = async (req, res) => {
    try{
        const penggunaId = req.user.id; 
        const transaksi = await transaksiService.ambilTransaksiById(penggunaId);
        return res.status(200).json({status:'sukses', pesan:'data transaksi anda berhasil diambil', data:transaksi})
    }catch(error){
        return res.status(400).json({status:'gagal',pesan:error.message});
    }
}

const buatTransaksi = async(req,res) => {
    try{
        const {pesananId,jumlahBayar,metodeBayar} = req.body;
        const transaksiBaru = await transaksiService.buatTransaksi(pesananId,jumlahBayar, metodeBayar);

        return res.status(201).json({status:'sukses', pesan:'transaksi ditambahkan', data:transaksiBaru})
    }catch(error){
        return res.status(400).json({status:'gagal',pesan : error.message});
    }
}

const updateStatusTransaksi = async (req,res) => {
    try{
        const transaksiId = req.params.id;
        const {statusBayar} = req.body;
        const statusTransaksi = await transaksiService.updateStatusBayar(transaksiId,statusBayar);
        return res.status(200).json({status:'sukses', pesan:'berhasil memperbarui status transaksi', data:statusTransaksi})
    }catch(error){
        return res.status(500).json({status:'gagal',pesan:error.message});
    }
}

const deleteTransaksi = async(req,res) => {
    try{
        const transaksiId = req.params.id;
        const deleteTransaksi = await transaksiService.deleteTransaksi(transaksiId);
        return res.status(200).json({status:'sukses', pesan:'berhasil menghapus transaksi', data:deleteTransaksi})
    }catch(error){
        return res.status(500).json({status:'gagal',pesan:error.message});
    }

}

module.exports = {getTransaksi,getTransaksiById,buatTransaksi,updateStatusTransaksi,deleteTransaksi};