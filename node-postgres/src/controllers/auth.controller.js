import UsersModel from "../models/UsersModel";
import jwt from 'jsonwebtoken';

export async function auth(req, res) {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({message:"Please send you user name and pasword"});
    const user = await UsersModel.findOne({
        where: {
            email,
            password
        }
    });
    if(!user) return  res.status(400).json({message:"invalid user or password"});
    const token = jwt.sign({id:user.id, name:user.name, email:user.email},'jwtpk');
    return res.status(200).json({message:"logged in",data: token});
}