"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MotoSchema = new mongoose_1.Schema({
    placa: { type: String, required: true },
    marca: { type: String, required: true },
    color: { type: String, required: true },
    modelo: { type: Date, required: true }
});
exports.default = (0, mongoose_1.model)("Motos", MotoSchema);
