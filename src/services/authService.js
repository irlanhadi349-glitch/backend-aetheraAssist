const prisma = require('../config/prisma')
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken");

const registrasiUser = async (email,password,namaLengkap,telepon) => {
    const cekUser = await prisma.pengguna.findUnique({where:{email}});
    if(cekUser){
        throw new Error('email sudah digunakan');
    }

    const passwordHash = await bcrypt.hash(password,10);
    const userBaru = await prisma.pengguna.create({
        data: {
            email, password: passwordHash,namaLengkap,
            telepon, role: 'KONSUMEN'
        }
    });

    const {password:_, ...userTanpaPassword}=userBaru;
    return userTanpaPassword;

};

const loginUser = async (email,password) => {
    const user = await prisma.pengguna.findUnique({where:{email}});
    if(!user){
        throw new Error ("kredensial tidak valid");
    }

    const passwordCocok = await bcrypt.compare(password,user.password);
    if (!passwordCocok){
        throw new Error('kredensial tidak valid');
    }

    const token = jwt.sign(
        { id : user.id, role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"1h"} 
    );

    return {
        token,
        user: {id:user.id, namaLengkap:user.namaLengkap, role: user.role}
    };
};

const updateUser = async(dataUpdate,userId) => {
    const password = await bcrypt.hash(dataUpdate.password,10)
    
    return await prisma.pengguna.update({
        where:{id:userId},
        data:{
            email: dataUpdate.email,
            password: password,
            namaLengkap: dataUpdate.namaLengkap,
            telepon: dataUpdate.telepon
        }
    })



}

const getProfilDiri = async (userId) => {
    const profil = await prisma.pengguna.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            email: true,
            namaLengkap: true,
            telepon: true,
            role: true,
            createdAt: true
        }
    });

    return profil;
};

module.exports = {registrasiUser, loginUser, getProfilDiri, updateUser};