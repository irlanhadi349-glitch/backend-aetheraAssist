const layananService = require ('../services/tempService');

const getAllLayanan = async (req, res) => {
    try{
        const layanan = await layananService.ambilSemuaLayanan();
        return res.status(200).json({status:'sukses', data:layanan});
    } catch(error){
        return res.status(500).json({status:'gagal', pesan:error.message});
    }
};

const getLayananById = async (req,res) => {
    try{
        const layanan = await layananService.ambilDetailLayanan(req.params.id);
        return res.status(200).json({status:'sukses', data:layanan});
    } catch(error){
        return res.status(404).json({status:'gagal', pesan:error.message});
    }
};

const createLayanan = async(req,res) => {
    try{
        const {namaJasa, deskripsi, harga, gambarUrl} = req.body;
        if(!namaJasa || !deskripsi || !harga){
            return res.status(400).json({status:'gagal', pesan:'wajib mengisi nama,deskripsi,harga'});
        }
        const layananBaru = await layananService.buatLayananBaru(namaJasa, deskripsi, harga,gambarUrl);
        return res.status(201).json({status:'sukses',pesan:'jasa berhasil ditambahkan', data:layananBaru})

    }catch(error){
        return res.status(400).json({status:'gagal', pesan:error.message});
    }
};

const updateLayanan = async (req, res) => {
    try {
        const layananDiperbarui = await layananService.perbaruiLayanan(req.params.id, req.body);
        return res.status(200).json({ status: 'sukses', pesan: 'Jasa berhasil diperbarui', data: layananDiperbarui });
    } catch (error) {
        return res.status(400).json({ status: 'gagal', pesan: error.message });
    }
};

const deleteLayanan = async (req, res) => {
    try {
        await layananService.hapusLayanan(req.params.id);
        return res.status(200).json({ status: 'sukses', pesan: 'Jasa berhasil dinonaktifkan dari katalog.' });
    } catch (error) {
        return res.status(400).json({ status: 'gagal', pesan: error.message });
    }
};

module.exports = { getAllLayanan, getLayananById, createLayanan, updateLayanan, deleteLayanan };