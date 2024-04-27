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
const express_1 = require("express");
const motos_1 = __importDefault(require("../models/motos"));
class PostRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    createMoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { moto } = req.body;
            const newPost = new motos_1.default({ moto });
            yield newPost.save();
            res.json({ status: res.status });
        });
    }
    getMotos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allMotos = yield motos_1.default.find();
            res.json({ status: res.status });
        });
    }
    getMoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const moto = yield motos_1.default.findById(id);
            res.json({ status: res.status });
        });
    }
    updateMoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield motos_1.default.findByIdAndUpdate(id, req.body);
            res.json({ status: res.status });
        });
    }
    deleteMoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield motos_1.default.findByIdAndRemove(id, req.body);
            res.json({ status: res.status });
        });
    }
    routes() {
        this.router.post("/", this.createMoto);
        this.router.get("/", this.getMotos);
        this.router.get("/:id", this.getMoto);
        this.router.put("/:id", this.updateMoto);
        this.router.delete("/:id", this.deleteMoto);
    }
}
const MotosRoutes = new PostRouter();
exports.default = MotosRoutes.router;
