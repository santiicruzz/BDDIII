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
const post_1 = __importDefault(require("../models/post"));
class PostRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = req.body;
            const newPost = new post_1.default({ title });
            yield newPost.save();
            res.json({ status: res.status });
        });
    }
    routes() {
        this.router.post("/", this.createPost);
    }
}
const postRoutes = new PostRouter();
exports.default = postRoutes.router;
