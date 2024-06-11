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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../models/usuario"));
class AutenticationController {
    static signUp(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, email, password } = req.body;
            const emailExist = yield usuario_1.default.findOne({ email: email });
            if (emailExist) {
                res.status(400).json('El email ya existe');
                return;
            }
            const usuario = new usuario_1.default({ userName, email, password });
            usuario.password = yield usuario.encrypPassword(usuario.password);
            const saveUser = yield usuario.save();
            const token = jsonwebtoken_1.default.sign({ _id: saveUser._id }, (_a = process.env.JWT_KEY) !== null && _a !== void 0 ? _a : 'tokenTest');
            res.json({
                "Token": token,
                "User": saveUser
            });
        });
    }
    static signIn(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const usuario = yield usuario_1.default.findOne({ email: email });
            if (!usuario) {
                res.status(400).json('Correo o contraseña incorrectos');
                return;
            }
            const correctPassword = yield usuario.validatePassword(password);
            if (!correctPassword) {
                res.status(400).json('Contraseña incorrecta');
                return;
            }
            const token = jsonwebtoken_1.default.sign({ _id: usuario._id }, (_a = process.env.JWT_KEY) !== null && _a !== void 0 ? _a : 'tokenTest');
            res.json({
                "Token": token,
                "User": usuario
            });
        });
    }
}
exports.default = AutenticationController;
