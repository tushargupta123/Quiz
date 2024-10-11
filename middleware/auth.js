const jwt = require('jsonwebtoken');
const User = require('../model/user');

module.exports = async (req,res,next) => {
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({message : 'Access Denied'});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    }catch(err){
        return res.status(400).json({message : 'Invalid token'});
    }
} 