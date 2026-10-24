
const prisma = require('../config/prisma');

const ambilSemuaLayanan = async () => {
    return await prisma.layanan.findMany({
        where:{aktif:true},
        orderBy:{createdAt: 'desc'}
    });
};

const ambilDetailLayanan = async (id) => {
    const layanan = await prisma.layanan.findUnique({
        where:{id:parseInt(id)}
    });
    if(!layanan) throw new Error('jasa tidak ditemukan di sistem');
    return layanan;
};

const buatLayananBaru = async (namaJasa, deskripsi, harga, gambarUrl) => {
    return await prisma.layanan.create({
        data: {
            namaJasa,
            deskripsi,
            harga: parseFloat(harga),
            gambarUrl
        }
    });

}

const perbaruiLayanan = async (id, dataUpdate) => {
    await ambilDetailLayanan(id);

    return await prisma.layanan.update({
        where:{id:parseInt(id)},
        data:{
            namaJasa:dataUpdate.namaJasa,
            deskripsi:dataUpdate.deskripsi,
            harga:dataUpdate.harga? parseFloat(dataUpdate.harga):undefined,
            gambarUrl:dataUpdate.gambarUrl,
            aktif:dataUpdate.aktif
        }
    });
}

const hapusLayanan = async(id) => {
    await ambilDetailLayanan(id);

    return await prisma.layanan.delete({
        where:{id: parseInt(id)}
    });
}

module.exports = {
    ambilSemuaLayanan, ambilDetailLayanan,
    buatLayananBaru,perbaruiLayanan,hapusLayanan
};