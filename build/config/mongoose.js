"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//import mongoose, { ConnectOptions } from "mongoose";
const urlMongo = "mongodb+srv://santiicruzz:1339@cluster0.mzqs3fn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose_1.default.set("useFindAndModify", false);
mongoose_1.default.connect(urlMongo || process.env.urlMongo, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
});
