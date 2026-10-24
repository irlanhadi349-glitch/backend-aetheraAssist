const jwt = require('jsonwebtoken');

const lindungiRute = (req,res, next) =>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token){
        return res.status(401).json({status:'gagal',pesan:'akses ditolak. Token tidak ditemukan.'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }catch(error){
        return res.status(401).json({status:'gagal', pesan:'Token tidak valid atau kadaluarsa.'});
    }  
}
const hanyaAdmin = (req,res,next) =>{
    if(req.user && req.user.role === 'ADMIN'){
        next();
    } else {
        return res.status(403).json({status:'gagal',pesan:'Akses ditolak. Rute ini khusus admin'})
    }
}

module.exports = {lindungiRute,hanyaAdmin};