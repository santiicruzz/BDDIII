import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export interface IPayLoad {
    _id: string;
    iat: number;
    exp: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.header('token');
        if(!token) return res.status(401).json('Acces Denied');
        const payload = jwt.verify(token, process.env.JFT_KEY ?? 'tokenTest') as IPayLoad;
        req.userId = payload._id;
        next();
    }
    catch(e){
        res.status(400).send('Invalid Token')
    }
}