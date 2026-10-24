const { PrismaClient } = require('@prisma/client');

// Mengecek apakah sudah ada instansiasi Prisma yang berjalan di memori global
const prisma = globalThis.prisma || new PrismaClient();

// Menyimpan instansiasi ke memori global agar tidak tergandakan saat Nodemon me-restart server
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma;
}

module.exports = prisma;