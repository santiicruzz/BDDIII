"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const motos_1 = __importDefault(require("../controllers/motos"));
const verifyToken_1 = require("../utilities/verifyToken");
class MotosRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/", verifyToken_1.TokenValidation, motos_1.default.createMoto);
        this.router.get("/", verifyToken_1.TokenValidation, motos_1.default.getMotos);
        this.router.get("/:id", verifyToken_1.TokenValidation, motos_1.default.getMotoByIdPropietario);
        this.router.put("/:id", verifyToken_1.TokenValidation, motos_1.default.updateMoto);
        this.router.delete("/:id", verifyToken_1.TokenValidation, motos_1.default.deleteMoto);
    }
}
const MotosRoutes = new MotosRouter();
exports.default = MotosRoutes.router;
