"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
class AuthRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post('/signUp', auth_controller_1.default.signUp);
        this.router.post('/signIn', auth_controller_1.default.signIn);
    }
}
const authRoutes = new AuthRouter();
exports.default = authRoutes.router;
