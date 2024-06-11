import{Request, Response, Router} from "express";
import Propietarios from "../models/propietario";
import usuarioModel from "../models/usuario";

class PropietariosController{

    static async createPropietario(req: Request, res: Response):Promise<void>{
        const usuario = await usuarioModel.findById(req.userId);
        if (!usuario) {
            res.status(404).json('Usuario no encontrado');
            return;
        }   

        const { cedula, nombre, apellido, correo, telefono  } = req.body;
        const newPropietario = new Propietarios({ cedula, nombre, apellido, correo, telefono });
        await newPropietario.save();
        res.json({
            status: res.status,
            message: 'Propietario Creado'
        });
    }
    static async getPropietarios(req: Request, res: Response):Promise<void>{
        const usuario = await usuarioModel.findById(req.userId);
        if (!usuario) {
            res.status(404).json('Usuario no encontrado');
            return;
        } 
        const allPropietarios = await Propietarios.find();
        res.json({
            status: 200,
            Propietarios: allPropietarios
        });
    }
    static async getPropietarioById(req: Request, res: Response):Promise<void>{
        const usuario = await usuarioModel.findById(req.userId);
        if (!usuario) {
            res.status(404).json('Usuario no encontrado');
            return;
        }
        const { id } = req.params;
        const propietario = await Propietarios.findById(id);
        res.json({
            status: 200,
            propietario: propietario
        });
    }
    static async updatePropietario(req: Request, res: Response):Promise<void>{
        const usuario = await usuarioModel.findById(req.userId);
        if (!usuario) {
            res.status(404).json('Usuario no encontrado');
            return;
        }
        const {id} = req.params;
        await Propietarios.findByIdAndUpdate(id, req.body)
        res.json({
            status: 200,
            message: 'Propietario actualizado'
        });
    }
    static async deletePropietario(req: Request, res: Response):Promise<void>{
        const usuario = await usuarioModel.findById(req.userId);
        if (!usuario) {
            res.status(404).json('Usuario no encontrado');
            return;
        }
        const {id} = req.params;
        await Propietarios.findByIdAndRemove(id, req.body)
        res.json({
            status: 200,
            message: 'Propietario Eliminado'
        });
    }
}
export default PropietariosController;