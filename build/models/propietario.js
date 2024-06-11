"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PropietarioSchema = new mongoose_1.Schema({
    cedula: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true },
    telefono: { type: String, reuired: true }
});
exports.default = (0, mongoose_1.model)("Propietarios", PropietarioSchema);
