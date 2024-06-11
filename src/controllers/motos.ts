import{Request, Response, Router} from "express";
import Motos from "../models/motos";
import Propietarios from "../models/propietario";
import usuarioModel from "../models/usuario";
import {mongoose} from "../config/mongoose";

class MotosController{

   /* static async createMoto(req: Request, res: Response):Promise<void>{
        console.log(req.body);
        const moto = req.body;
        console.log(moto);
        const newMoto = new Motos(moto);
        await newMoto.save();
        res.json({status: res.status});
    }*/
    static async createMoto(req: Request, res: Response):Promise<void> {
        try {
            const usuario = await usuarioModel.findById(req.userId);
            if(!usuario){
                res.status(404).json('Usuario no encontrado');
                return;
            }

            const {placa,marca,color,modelo,propietario} = req.body;
            
            // Buscar todos los propietarios existentes en la base de datos
            const propietariosExistentes = await Propietarios.find({}, '_id');
            const propietariosExistentesIds = propietariosExistentes.map((propietario: { _id: { toString: () => any; }; }) => propietario._id.toString());
            // Verificar si todos los propietarios existen
            const propietariosNoEncontrados: string[] = [];
            for (const propietarioId of propietario) {
                if (!propietariosExistentesIds.includes(propietarioId)) {
                    propietariosNoEncontrados.push(propietarioId);
                }
            }
    
            if (propietariosNoEncontrados.length > 0) {
                res.status(404).json({ error: `Los siguientes cursos no se encontraron: ${propietariosNoEncontrados.join(', ')}` });
                return;
            }
            
            // Crear la nueva moto con el propietario relacionado
            const nuevaMoto = new Motos({
                placa,
                marca,
                color,
                modelo,
                propietario
            });
            
            // Guardar la nueva moto en la base de datos
            await nuevaMoto.save();
            
            // Respuesta exitosa
            res.status(201).json({
                status: res.status,
                message: 'moto creada exitosamente'
            });
        } catch (error) {
            console.error('Error al crear la moto:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    static async getMotos(req: Request, res: Response):Promise<void>{
        const usuario = await usuarioModel.findById(req.userId);
        if(!usuario){
            res.status(404).json('Usuario no encontrado');
            return;
        }

        const allMotos = await Motos.aggregate(
            [
                {
                    $lookup:
                    {
                        from: "propietariomodel",
                        localfield: "propietarios",
                        foreignField: "_id",
                        as: "propietarioMoto"
                    }
                },
                {
                    $unwind: "$propietarioMoto"
                }
            ]
        );
        console.log(allMotos);
        res.json({
            status: 200,
            motos: allMotos
        });
    }
    static async getMotoById(req: Request, res: Response):Promise<void>{
        const usuario = await usuarioModel.findById(req.userId);
        if(!usuario){
            res.status(404).json('Usuario no encontrado');
            return;
        }   
        const {id} = req.params;
        const moto = await Motos.findById(id);
        res.json({
            status: 200,
            moto: moto
        });    
    }
    static async getMotoByIdPropietario(req: Request, res: Response): Promise<void>{
        const usuario = await usuarioModel.findById(req.userId);
        if(!usuario){
            res.status(404).json('Usuario no encontrado');
            return;
        }
        const {id} = req.params;
        try {
            const motos = await Motos.aggregate([
                {
                    $match:{"propietarios": mongoose.Types.ObjectId(id)}
                }
            ]);
            if(motos.length === 0){
                res.status(404).json({status: 404, message: "No se encontraron motos del propietario relacionado"});
                return;
            }
            res.json({status: 200, motos: motos})
        } catch (error) {
            console.error("Error al buscar las motos por id del propietario", error);
            res.status(500).json({status: 500, message: "Error interno del servidor"});
        }
    }
    static async updateMoto(req: Request, res: Response):Promise<void>{
        try {
            const usuario = await usuarioModel.findById(req.userId);
            if(!usuario){
                res.status(404).json('Usuario no encontrado');
                return;
            }
            const {id} = req.params;
            const {placa,marca,color,modelo,propietario} = req.body;

            const motoExistente = await Motos.findById(id);
            if (!motoExistente) {
                res.status(404).json({ error: 'La moto no se encontró' });
                return;
            }
            const propietariosExistentes = await Propietarios.find({}, '_id');
            const propietariosExistentesIds = propietariosExistentes.map((propietario: { _id: { toString: () => any; }; }) => propietario._id.toString());
            const propietariosNoEncontrados: string[] = [];
            for (const propietarioId of propietario) {
                if (!propietariosExistentesIds.includes(propietarioId)) {
                    propietariosNoEncontrados.push(propietarioId);
                }
            }
            if (propietariosNoEncontrados.length > 0) {
                res.status(404).json({ error: `Los siguientes cursos no se encontraron: ${propietariosNoEncontrados.join(', ')}` });
                return;
            }

            // Actualizar la asignatura
            await Motos.findByIdAndUpdate(id, {
                placa,
                marca,
                color,
                modelo,
                propietario
            });

            // Respuesta exitosa
            res.status(200).json({
                status: res.status,
                message: 'Moto actualizada exitosamente'
            });
          
        } catch (error) {
            console.error('Error al actualizar la moto:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }              
    }
    static async deleteMoto(req: Request, res: Response):Promise<void>{
        const usuario = await usuarioModel.findById(req.userId);
        if(!usuario){
            res.status(404).json('Usuario no encontrado');
            return;
        }  
        const {id} = req.params;
        await Motos.findByIdAndRemove(id,req.body);
        res.json({
            status: 200,
            message: 'Moto Eliminada'
        });
    }
}

export default MotosController;