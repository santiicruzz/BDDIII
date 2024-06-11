"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const motos_1 = __importDefault(require("../models/motos"));
const propietario_1 = __importDefault(require("../models/propietario"));
const usuario_1 = __importDefault(require("../models/usuario"));
const mongoose_1 = require("../config/mongoose");
class MotosController {
    /* static async createMoto(req: Request, res: Response):Promise<void>{
         console.log(req.body);
         const moto = req.body;
         console.log(moto);
         const newMoto = new Motos(moto);
         await newMoto.save();
         res.json({status: res.status});
     }*/
    static createMoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = yield usuario_1.default.findById(req.userId);
                if (!usuario) {
                    res.status(404).json('Usuario no encontrado');
                    return;
                }
                const { placa, marca, color, modelo, propietario } = req.body;
                // Buscar todos los propietarios existentes en la base de datos
                const propietariosExistentes = yield propietario_1.default.find({}, '_id');
                const propietariosExistentesIds = propietariosExistentes.map((propietario) => propietario._id.toString());
                // Verificar si todos los propietarios existen
                const propietariosNoEncontrados = [];
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
                const nuevaMoto = new motos_1.default({
                    placa,
                    marca,
                    color,
                    modelo,
                    propietario
                });
                // Guardar la nueva moto en la base de datos
                yield nuevaMoto.save();
                // Respuesta exitosa
                res.status(201).json({
                    status: res.status,
                    message: 'moto creada exitosamente'
                });
            }
            catch (error) {
                console.error('Error al crear la moto:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    static getMotos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuario_1.default.findById(req.userId);
            if (!usuario) {
                res.status(404).json('Usuario no encontrado');
                return;
            }
            const allMotos = yield motos_1.default.aggregate([
                {
                    $lookup: {
                        from: "propietariomodel",
                        localfield: "propietarios",
                        foreignField: "_id",
                        as: "propietarioMoto"
                    }
                },
                {
                    $unwind: "$propietarioMoto"
                }
            ]);
            console.log(allMotos);
            res.json({
                status: 200,
                motos: allMotos
            });
        });
    }
    static getMotoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuario_1.default.findById(req.userId);
            if (!usuario) {
                res.status(404).json('Usuario no encontrado');
                return;
            }
            const { id } = req.params;
            const moto = yield motos_1.default.findById(id);
            res.json({
                status: 200,
                moto: moto
            });
        });
    }
    static getMotoByIdPropietario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuario_1.default.findById(req.userId);
            if (!usuario) {
                res.status(404).json('Usuario no encontrado');
                return;
            }
            const { id } = req.params;
            try {
                const motos = yield motos_1.default.aggregate([
                    {
                        $match: { "propietarios": mongoose_1.mongoose.Types.ObjectId(id) }
                    }
                ]);
                if (motos.length === 0) {
                    res.status(404).json({ status: 404, message: "No se encontraron motos del propietario relacionado" });
                    return;
                }
                res.json({ status: 200, motos: motos });
            }
            catch (error) {
                console.error("Error al buscar las motos por id del propietario", error);
                res.status(500).json({ status: 500, message: "Error interno del servidor" });
            }
        });
    }
    static updateMoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = yield usuario_1.default.findById(req.userId);
                if (!usuario) {
                    res.status(404).json('Usuario no encontrado');
                    return;
                }
                const { id } = req.params;
                const { placa, marca, color, modelo, propietario } = req.body;
                const motoExistente = yield motos_1.default.findById(id);
                if (!motoExistente) {
                    res.status(404).json({ error: 'La moto no se encontró' });
                    return;
                }
                const propietariosExistentes = yield propietario_1.default.find({}, '_id');
                const propietariosExistentesIds = propietariosExistentes.map((propietario) => propietario._id.toString());
                const propietariosNoEncontrados = [];
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
                yield motos_1.default.findByIdAndUpdate(id, {
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
            }
            catch (error) {
                console.error('Error al actualizar la moto:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    static deleteMoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuario_1.default.findById(req.userId);
            if (!usuario) {
                res.status(404).json('Usuario no encontrado');
                return;
            }
            const { id } = req.params;
            yield motos_1.default.findByIdAndRemove(id, req.body);
            res.json({
                status: 200,
                message: 'Moto Eliminada'
            });
        });
    }
}
exports.default = MotosController;
