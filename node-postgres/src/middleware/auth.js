import jwt from 'jsonwebtoken';

module.exports = function (req, res, next){
    const token = req.header('x-auth-token');
    if(!token)return res.status(401).send('Access denied.');

    try{
        //jwtpk must be a environment var, and should be secret
        const decoded = jwt.verify(token,'jwtpk');
        req.user = decoded;
        next();
    }catch(e){
        res.status(400).send('Invalid token');
    }
}