
const prisma = require('../config/prisma');

const ambilTransaksi = async () => {
    const transaksi = await prisma.transaksi.findMany({
        include: {
            pesanan: {
                include: {
                    pengguna: {
                        select: {
                            id: true,
                            namaLengkap: true,
                            email: true
                        }
                    },
                    layanan: {
                        select: {
                            namaJasa: true,
                            harga: true
                        }
                    }
                }
            }
        },
        orderBy: {
            id: 'desc'
        }
    });

    return transaksi;
};

const buatTransaksi = async (
    pesananId,
    jumlahBayar,
    metodeBayar
) => {
    const idPesanan = Number(pesananId);
    const nominal = Number(jumlahBayar);

    if (!Number.isInteger(idPesanan) || idPesanan <= 0) {
        throw new Error('ID pesanan tidak valid.');
    }

    if (!Number.isFinite(nominal) || nominal <= 0) {
        throw new Error('Jumlah pembayaran tidak valid.');
    }

    const pesanan = await prisma.pesanan.findUnique({
        where: {
            id: idPesanan
        },
        include: {
            layanan: true
        }
    });

    if (!pesanan) {
        throw new Error('Pesanan tidak ditemukan.');
    }

    const transaksiAda = await prisma.transaksi.findUnique({
        where: {
            pesananId: idPesanan
        }
    });

    if (transaksiAda) {
        throw new Error(
            'Transaksi untuk pesanan ini sudah dibuat.'
        );
    }

    if (nominal !== pesanan.layanan.harga) {
        throw new Error(
            'Jumlah pembayaran harus sesuai harga layanan.'
        );
    }

    return await prisma.transaksi.create({
        data: {
            pesananId: idPesanan,
            jumlahBayar: nominal,
            metodeBayar: metodeBayar || null,
            statusLunas: false
        }
    });
};

const updateStatusBayar = async (
    transaksiId,
    statusLunas
) => {
    const idTransaksi = Number(transaksiId);

    if (!Number.isInteger(idTransaksi) || idTransaksi <= 0) {
        throw new Error('ID transaksi tidak valid.');
    }

    if (typeof statusLunas !== 'boolean') {
        throw new Error('Status pelunasan harus berupa boolean.');
    }

    return await prisma.transaksi.update({
        where: {
            id: idTransaksi
        },
        data: {
            statusLunas,
            tanggalBayar: statusLunas ? new Date() : null
        }
    });
};


module.exports = {
    ambilTransaksi,
    buatTransaksi,
    updateStatusBayar
};