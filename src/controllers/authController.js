const authService = require('../services/authService');
const prisma = require('../config/prisma');

const register = async (req,res) =>{
    try{
        const{email, password, namaLengkap,telepon} = req.body;
        const newUser = await authService.registrasiUser(email, password, namaLengkap, telepon);

        return res.status(201).json({
            status: 'sukses',
            pesan: 'Registrasi berhasil',
            data : newUser
        })
    }catch(error){
        return res.status(400).json({
            status:'gagal',
            pesan: error.message
        })
    }
};

const login = async (req,res) => {
    try{
        const{email,password} = req.body;
        const dataLogin = await authService.loginUser(email,password);
        return res.status(200).json({
            status:'sukses',
            pesan:'login berhasil',
            data: dataLogin
        })
    } catch(error){
        return res.status(401).json({
            status:'gagal',
            pesan: error.message
        })
    }
};

const update = async(req,res) => {
    try{
        const update = await authService.updateUser(req.body, req.user.id);
            return res.status(200).json({
            status:'sukses',
            pesan:'login berhasil',
            data: update
        })
    } catch(error){
        return res.status(401).json({
            status:'gagal',
            pesan: error.message
        })
    }

};
const getProfilDiri = async (req, res) => {
    try {
        const userId = req.user.id;

        const profil = await authService.getProfilDiri(userId);

        return res.status(200).json({
            status: 'sukses',
            data: profil
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            pesan: error.message
        });
    }
};

module.exports = {register, login, getProfilDiri, update};