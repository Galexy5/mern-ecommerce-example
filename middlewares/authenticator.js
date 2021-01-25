const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');

exports.authenticateJWT = (req,res,next)=>{
    const token = req.cookies.token
    
    if(!token){
        return res.status(401).json({error:"No token. Authorization denied"});
    }
    
    try {
        const decoded=jwt.verify(token,jwtSecret);
        req.user=decoded.user
        
    } catch (error) {
        res.status(401).json({error:"Invalid token"})
    }

    next();
}