"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenValidation = (req, res, next) => {
    var _a;
    try {
        const token = req.header('token');
        if (!token)
            return res.status(401).json('Acces Denied');
        const payload = jsonwebtoken_1.default.verify(token, (_a = process.env.JFT_KEY) !== null && _a !== void 0 ? _a : 'tokenTest');
        req.userId = payload._id;
        next();
    }
    catch (e) {
        res.status(400).send('Invalid Token');
    }
};
exports.TokenValidation = TokenValidation;
