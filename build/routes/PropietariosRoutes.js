"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const propietarios_1 = __importDefault(require("../controllers/propietarios"));
const verifyToken_1 = require("../utilities/verifyToken");
class PropietariosRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/", verifyToken_1.TokenValidation, propietarios_1.default.createPropietario);
        this.router.get("/", verifyToken_1.TokenValidation, propietarios_1.default.getPropietarios);
        this.router.get("/:id", verifyToken_1.TokenValidation, propietarios_1.default.getPropietarioById);
        this.router.put("/:id", verifyToken_1.TokenValidation, propietarios_1.default.updatePropietario);
        this.router.delete("/:id", verifyToken_1.TokenValidation, propietarios_1.default.deletePropietario);
    }
}
const PropietariosRoutes = new PropietariosRouter();
exports.default = PropietariosRoutes.router;
