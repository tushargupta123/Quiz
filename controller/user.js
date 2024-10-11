const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getToken = (user) => {
    return jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn : '1d'});
}

const signup = async (req,res) => {
    try{
        const {username,password} = req.body;
        let user = await User.findOne({username: username});
        if(user){
            return res.status(403).json({message: "username already in use."});
        }
        const hashedPassword = bcrypt.hashSync(password,10);
        req.body.password = hashedPassword;
        user = await User.create(req.body);
        return res.status(200).json({message : "User created successfully!",token : getToken(user)});
    }catch(err){
        return res.status(500).json({message : err.message});
    }
}

const login = async (req,res) => {
    try{
        const {username,password} = req.body;
        let user = await User.findOne({username: username});
        if(!user){
            return res.status(401).json({message: "Invalid Credentials"});
        }
        const isValid = bcrypt.compare(password,user.password);
        if(!isValid){
            return res.status(401).json({message: "Invalid Credentials"});
        }
        return res.status(200).json({token:getToken(user)});
    }catch(err){
        return res.status(500).json({message : err.message});
    }
}

module.exports = {
    signup,login
};