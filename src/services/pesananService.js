const prisma = require('../config/prisma');

const buatPesanan = async (penggunaId, layananId, catatanKebutuhan) => {
    const layanan = await prisma.layanan.findUnique({ where: {id: parseInt(layananId)}});
    if (!layanan) throw new Error ('jasa tidak ditemukan');
    if (!layanan.aktif) throw new Error ('mohon maff , jasa ini sedang tidak tersedia');

    return await prisma.pesanan.create({
        data:{
            penggunaId: parseInt(penggunaId),
            layananId: parseInt(layananId),
            catatanKebutuhan

        }
    });
};

const ambilPesananSaya = async (penggunaId) => {
    return await prisma.pesanan.findMany({
        where:{penggunaId:parseInt(penggunaId)},
        include: {
            layanan: {
                select:{namaJasa: true, harga: true, gambarUrl:true}
            }   
        },
        orderBy:{createdAt : 'desc'}
    });
};

const ambilSemuaPesanan = async () => {
    return await prisma.pesanan.findMany({
        include:{
            pengguna: {select: {namaLengkap: true, email:true, telepon:true}},
            layanan : {select:{namaJasa:true,harga:true, gambarUrl:true}}
        },
        orderBy:{createdAt: 'desc'}
    })
};

const perbaruiStatus = async (pesananId, status, fileHasilUrl) => {
    const statusValid = ['MENUNGGU_KONFIRMASI','DIPROSES','SELESAI','DIBATALKAN'];
    if(!statusValid.includes(status)){
        throw new Error('status tidak valid')
    }

    return await prisma.pesanan.update({
        where:{id:parseInt(pesananId)},
        data: {
            status,
            fileHasilUrl: fileHasilUrl || null
        }
    });
};

module.exports = {buatPesanan, ambilPesananSaya, ambilSemuaPesanan, perbaruiStatus};