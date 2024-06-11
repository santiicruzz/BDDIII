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
const propietario_1 = __importDefault(require("../models/propietario"));
const usuario_1 = __importDefault(require("../models/usuario"));
class PropietariosController {
    static createPropietario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuario_1.default.findById(req.userId);
            if (!usuario) {
                res.status(404).json('Usuario no encontrado');
                return;
            }
            const { cedula, nombre, apellido, correo, telefono } = req.body;
            const newPropietario = new propietario_1.default({ cedula, nombre, apellido, correo, telefono });
            yield newPropietario.save();
            res.json({
                status: res.status,
                message: 'Propietario Creado'
            });
        });
    }
    static getPropietarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuario_1.default.findById(req.userId);
            if (!usuario) {
                res.status(404).json('Usuario no encontrado');
                return;
            }
            const allPropietarios = yield propietario_1.default.find();
            res.json({
                status: 200,
                Propietarios: allPropietarios
            });
        });
    }
    static getPropietarioById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuario_1.default.findById(req.userId);
            if (!usuario) {
                res.status(404).json('Usuario no encontrado');
                return;
            }
            const { id } = req.params;
            const propietario = yield propietario_1.default.findById(id);
            res.json({
                status: 200,
                propietario: propietario
            });
        });
    }
    static updatePropietario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuario_1.default.findById(req.userId);
            if (!usuario) {
                res.status(404).json('Usuario no encontrado');
                return;
            }
            const { id } = req.params;
            yield propietario_1.default.findByIdAndUpdate(id, req.body);
            res.json({
                status: 200,
                message: 'Propietario actualizado'
            });
        });
    }
    static deletePropietario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuario_1.default.findById(req.userId);
            if (!usuario) {
                res.status(404).json('Usuario no encontrado');
                return;
            }
            const { id } = req.params;
            yield propietario_1.default.findByIdAndRemove(id, req.body);
            res.json({
                status: 200,
                message: 'Propietario Eliminado'
            });
        });
    }
}
exports.default = PropietariosController;
