import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import usuarioModel from '../models/usuario';

class AutenticationController{
    static async signUp(req: Request, res: Response): Promise<void>{
        const {userName, email, password} = req.body;
        const emailExist = await usuarioModel.findOne({email: email});
        if(emailExist){
            res.status(400).json('El email ya existe');
            return;
        }
        const usuario = new usuarioModel({userName, email, password});
        usuario.password = await usuario.encrypPassword(usuario.password);
        const saveUser = await usuario.save();
        const token: string = jwt.sign({_id: saveUser._id}, process.env.JWT_KEY ?? 'tokenTest')
        res.json({
            "Token": token,
            "User": saveUser
        });
    }

    static async signIn(req: Request, res: Response): Promise<void>{
        const {email, password} = req.body;
        const usuario = await usuarioModel.findOne({email: email})
        if(!usuario){
            res.status(400).json('Correo o contraseña incorrectos');
            return;
        }
        const correctPassword: boolean = await usuario.validatePassword(password);
        if(!correctPassword){
            res.status(400).json('Contraseña incorrecta');
            return;
        }
        const token: string = jwt.sign({_id: usuario._id}, process.env.JWT_KEY ?? 'tokenTest')
        res.json({
            "Token": token,
            "User": usuario
        })
    }
}
export default AutenticationController;